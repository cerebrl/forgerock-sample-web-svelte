import { Config } from '@forgerock/javascript-sdk';

import { AM_URL, JOURNEY_LOGIN, REALM_PATH, WEB_OAUTH_CLIENT } from '$lib/constants';

export default function initConfig(url: any) {
  console.log('SDK is initializing with the following URL metadata:');
  console.log(url);
  Config.set({
    clientId: WEB_OAUTH_CLIENT,
    redirectUri: `https://${url.host}/callback`,
    scope: 'openid profile email',
    serverConfig: {
      baseUrl: AM_URL,
      timeout: 5000,
    },
    realmPath: REALM_PATH,
    tree: JOURNEY_LOGIN,
  });
}
