export const paths = {
  home: '/',
  yearDate: '/year-date',
};

export const routes = {
  home: '/',
  yearDate: (day: number, month: number): string => {
    return `/year-date?day=${day}&month=${month}`;
  },
};
