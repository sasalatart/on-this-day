import { Theme } from '@material-ui/core';

export * from './Link';
export { default as Centered } from './Centered';
export { default as Input } from './Input';
export { default as PaperBox } from './PaperBox';
export { default as Spinner } from './Spinner';
export { default as SubmitButton } from './SubmitButton';

export type StyledTheme = {
  theme: Theme;
};
