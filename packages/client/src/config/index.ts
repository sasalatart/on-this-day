export { default as theme } from './theme';

export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? window.location.origin
    : 'http://localhost:9000';

export const WIKI_URL = 'https://wikipedia.org';
export const REPO_URL = 'https://github.com/sasalatart/on-this-day';
export const USERNAME_URL = 'https://github.com/sasalatart';
