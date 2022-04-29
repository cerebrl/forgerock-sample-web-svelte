import { Config } from '@forgerock/javascript-sdk';

import { AM_URL, APP_URL, JOURNEY_LOGIN, REALM_PATH, WEB_OAUTH_CLIENT } from './constants';

Config.set({
  clientId: WEB_OAUTH_CLIENT,
  redirectUri: `${APP_URL}/callback`,
  scope: 'openid profile email',
  serverConfig: {
    baseUrl: AM_URL,
    timeout: 5000,
  },
  realmPath: REALM_PATH,
  tree: JOURNEY_LOGIN,
});
