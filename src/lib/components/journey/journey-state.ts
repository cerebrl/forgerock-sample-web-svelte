import {
  FRAuth,
  FRStep,
  FRLoginFailure,
  FRLoginSuccess,
  TokenManager,
  UserManager
} from '@forgerock/javascript-sdk';
import { get, writable, type Writable } from 'svelte/store';

interface User {
  family_name: string;
  given_name: string;
  name: string;
  updated_at: number;
  sub: string;
}

export const step: Writable<FRStep | FRLoginSuccess | FRLoginFailure | null> = writable(null);
export const user: Writable<User | null> = writable(null);

async function getOAuth() {
  try {
    await TokenManager.getTokens({ forceRenew: true });
  } catch (err) {
    console.info(`Error: get tokens; ${err}`);
  }

  try {
    const userResponse = (await UserManager.getCurrentUser()) as User;
    user.set(userResponse);
  } catch (err) {
    console.error(`Error: get current user; ${err}`);
    user.set(null);
  }
}

export async function getStep() {
  const nextStep: FRStep | FRLoginSuccess | FRLoginFailure = await FRAuth.next(
    get(step as Writable<FRStep>)
  );
  step.set(nextStep);

  if (nextStep.type === 'LoginSuccess') {
    // User is authenticated, now call for OAuth tokens
    getOAuth();
  }
}
