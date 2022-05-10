/*
 * forgerock-sample-web-react
 *
 * constants.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import.meta.env.VITE_AM_URL;
import.meta.env.VITE_APP_URL;
const API_URL = import.meta.env.VITE_API_URL;
// Yes, the debugger boolean is intentionally reversed
import.meta.env.VITE_DEBUGGER_OFF === 'true' ? false : true;
const JOURNEY_LOGIN = import.meta.env.VITE_JOURNEY_LOGIN;
const JOURNEY_REGISTER = import.meta.env.VITE_JOURNEY_REGISTER;
import.meta.env.VITE_WEB_OAUTH_CLIENT;
import.meta.env.VITE_REALM_PATH;

export { API_URL, JOURNEY_LOGIN, JOURNEY_REGISTER };
