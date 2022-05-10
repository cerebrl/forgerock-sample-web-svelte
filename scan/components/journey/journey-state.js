import { StepType, FRAuth, FRLoginFailure, TokenManager, UserManager } from '@forgerock/javascript-sdk';
import { writable, get } from 'svelte/store';
import { htmlDecode } from '../../utilities/decode.js';
import { email, isAuthenticated, username } from '../../global-state.js';

async function initTree(tree) {
    const step = writable(null);
    const failureMessage = writable(null);
    const submittingForm = writable(false);
    async function getOAuth() {
        try {
            await TokenManager.getTokens({ forceRenew: true });
        }
        catch (err) {
            console.error(`Get tokens | ${err}`);
            step.set(new FRLoginFailure({ message: err.message }));
            submittingForm.set(false);
            return;
        }
        try {
            const user = (await UserManager.getCurrentUser());
            email.set(user.email);
            isAuthenticated.set(true);
            username.set(user.name);
        }
        catch (err) {
            console.error(`Get current user | ${err}`);
            step.set(new FRLoginFailure({ message: err.message }));
            submittingForm.set(false);
        }
    }
    async function getStep(prevStep = null) {
        /**
         * Save previous step information just in case we have a total
         * form failure due to 400 response from ForgeRock.
         */
        let previousCallbacks;
        let previousStage;
        if (prevStep && prevStep.type === StepType.Step) {
            previousStage = prevStep?.getStage && prevStep.getStage();
            previousCallbacks = prevStep?.callbacks;
        }
        const previousPayload = prevStep?.payload;
        let nextStep;
        step.set(prevStep);
        try {
            /**
             * Initial attempt to retrieve next step
             */
            nextStep = await FRAuth.next(get(step), { tree });
        }
        catch (err) {
            console.error(`Next step request | ${err}`);
            /**
             * Setup an object to display failure message
             */
            nextStep = new FRLoginFailure({
                message: 'Unknown request failure'
            });
        }
        if (nextStep.type === StepType.Step) {
            step.set(nextStep);
            submittingForm.set(false);
        }
        else if (nextStep.type === StepType.LoginSuccess) {
            // User is authenticated, now call for OAuth tokens
            console.log('Calling OAuth flow.');
            getOAuth();
            step.set(nextStep);
            submittingForm.set(false);
        }
        else if (nextStep.type === StepType.LoginFailure) {
            /**
             * Grab failure message, which may contain encoded HTML
             */
            const failureMessageStr = htmlDecode(nextStep.payload.message || '');
            let restartStep;
            try {
                /**
                 * Restart tree to get fresh step
                 */
                restartStep = await FRAuth.next(undefined, { tree });
            }
            catch (err) {
                console.error(`Restart failed step request | ${err}`);
                /**
                 * Setup an object to display failure message
                 */
                restartStep = new FRLoginFailure({
                    message: 'Unknown request failure'
                });
            }
            /** *******************************************************************
             * SDK INTEGRATION POINT
             * Summary: Repopulate callbacks/payload with previous data.
             * --------------------------------------------------------------------
             * Details: Now that we have a new authId (the identification of the
             * fresh step) let's populate this new step with old callback data if
             * the stage is the same. If not, the user will have to refill form. We
             * will display the error we collected from the previous submission,
             * restart the flow, and provide better UX with the previous form data,
             * so the user doesn't have to refill the form.
             ******************************************************************* */
            if (restartStep.type === StepType.Step && restartStep.getStage() === previousStage) {
                if (previousCallbacks)
                    restartStep.callbacks = previousCallbacks;
                restartStep.payload = {
                    ...previousPayload,
                    authId: restartStep.payload.authId
                };
            }
            failureMessage.set(failureMessageStr);
            step.set(restartStep);
            submittingForm.set(false);
        }
    }
    /**
     * Start tree and get first step
     */
    getStep();
    return {
        step,
        getStep,
        failureMessage,
        submittingForm,
    };
}

export { initTree };
