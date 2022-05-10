import { writable } from 'svelte/store';
import { browser } from '$app/env';

const darkTheme = {
    mode: 'dark',
    // CSS Classes
    bgClass: 'bg-dark',
    borderClass: 'border-dark',
    borderHighContrastClass: 'cstm_border_black',
    cardBgClass: 'cstm_card-dark',
    dropdownClass: 'dropdown-menu-dark',
    listGroupClass: 'cstm_list-group_dark',
    navbarClass: 'cstm_navbar-dark navbar-dark bg-dark text-white',
    textClass: 'text-white',
    textMutedClass: 'text-white-50',
};
const lightTheme = {
    mode: 'light',
    // CSS Classes
    bgClass: '',
    borderClass: '',
    borderHighContrastClass: '',
    cardBgClass: '',
    dropdownClass: '',
    listGroupClass: '',
    navbarClass: 'navbar-light bg-white',
    textClass: '',
    textMutedClass: 'text-muted',
};
let prefersDarkTheme = false;
let storedAuthentication = false;
let storedEmail = '';
let storedUsername = '';
if (browser) {
    /**
     * Pull stored values from outside of the app to (re)hydrate state.
     */
    prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedAuthenticationString = window.sessionStorage.getItem('sdk_authentication');
    storedAuthentication = storedAuthenticationString === 'true' ? true : false;
    storedEmail = window.sessionStorage.getItem('sdk_email');
    storedUsername = window.sessionStorage.getItem('sdk_username');
    if (prefersDarkTheme) {
        document.body.classList.add('cstm_bg-dark', 'bg-dark');
    }
}
const email = writable(storedEmail);
const isAuthenticated = writable(storedAuthentication);
const theme = writable(prefersDarkTheme ? darkTheme : lightTheme);
const username = writable(storedUsername);
isAuthenticated.subscribe((authentication) => {
    if (browser)
        window.sessionStorage.setItem('sdk_authentication', `${authentication}`);
});
email.subscribe((email) => {
    if (browser)
        window.sessionStorage.setItem('sdk_email', `${email}`);
});
username.subscribe((username) => {
    if (browser)
        window.sessionStorage.setItem('sdk_username', `${username}`);
});

export { email, isAuthenticated, theme, username };
