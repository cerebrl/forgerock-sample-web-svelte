import {
  FRAuth,
  FRStep,
  FRLoginFailure,
  FRLoginSuccess,
  StepType,
  TokenManager,
  UserManager
} from '@forgerock/javascript-sdk';
import { get, writable, type Writable } from 'svelte/store';

import { htmlDecode } from '$lib/utilities/decode';
import { email, isAuthenticated, username } from '$lib/global-state';

interface User {
  family_name: string;
  given_name: string;
  email: string;
  name: string;
  updated_at: number;
  sub: string;
}
export type StepTypes = FRStep | FRLoginSuccess | FRLoginFailure | null;

async function getOAuth() {
  try {
    await TokenManager.getTokens({ forceRenew: true });
  } catch (err) {
    console.info(`Error: get tokens; ${err}`);
    return;
  }

  try {
    const user = (await UserManager.getCurrentUser()) as User;
    email.set(user.email);
    isAuthenticated.set(true);
    username.set(user.name);
  } catch (err) {
    console.error(`Error: get current user; ${err}`);
  }
}
export async function initTree(tree: string) {
  async function getStep(prevStep: StepTypes = null) {
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
    let nextStep: StepTypes;

    step.set(prevStep);
    try {
      /**
       * Initial attempt to retrieve next step
       */
      nextStep = await FRAuth.next(get(step as Writable<FRStep>), { tree});
    } catch (err) {
      console.error(`Error: failure in next step request; ${err}`);

      /**
       * Setup an object to display failure message
       */
      nextStep = new FRLoginFailure({
        message: 'Unknown request failure'
      });
    }

    if (nextStep.type === StepType.Step) {
      step.set(nextStep);
    } else if (nextStep.type === StepType.LoginSuccess) {
      // User is authenticated, now call for OAuth tokens
      getOAuth();
      step.set(nextStep)
    } else if (nextStep.type === StepType.LoginFailure) {
      /**
       * Grab failure message, which may contain encoded HTML
       */
      const failureMessageStr = htmlDecode(nextStep.payload.message || '');
      let restartStep: StepTypes;

      try {
        /**
         * Restart tree to get fresh step
         */
        restartStep = await FRAuth.next(undefined, { tree });
      } catch (err) {
        console.error(`Error: failure in new step request; ${err}`);

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
        if (previousCallbacks) restartStep.callbacks = previousCallbacks;
        restartStep.payload = {
          ...previousPayload,
          authId: restartStep.payload.authId
        };
      }
      failureMessage.set(failureMessageStr);
      step.set(restartStep);
    }
  }

  const step: Writable<StepTypes> = writable(null);
  const failureMessage: Writable<string | null> = writable(null);
  let initialStep: StepTypes;

  try {
    /**
     * Start tree and get first step
     */
    initialStep = await FRAuth.next(undefined, { tree});
  } catch (err) {
    console.error(`Error: tree failed to initialize; ${err}`);

    /**
     * Setup an object to display failure message
     */
    initialStep = new FRLoginFailure({
      message: 'Unknown request failure'
    });
  }

  step.set(initialStep);

  return {
    step,
    getStep,
    failureMessage,
  };
}
