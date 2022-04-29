import { writable } from 'svelte/store';

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

export const email = writable('');
export const isAuthenticated = writable(false);
export const theme = writable(darkTheme);
export const username = writable('');

export function setTheme(mode: string) {
  if (mode === 'dark') {
    theme.set(darkTheme);
  } else {
    theme.set(lightTheme);
  }
}
