import {
  FRAuth,
  FRStep,
  FRLoginFailure,
  FRLoginSuccess,
  TokenManager,
  UserManager
} from '@forgerock/javascript-sdk';
import { get, writable, type Writable } from 'svelte/store';

import { email, isAuthenticated, username } from '../../global-state';

interface User {
  family_name: string;
  given_name: string;
  email: string;
  name: string;
  updated_at: number;
  sub: string;
}

export const step: Writable<FRStep | FRLoginSuccess | FRLoginFailure | null> = writable(null);

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
