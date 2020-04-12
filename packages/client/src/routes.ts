export const paths = {
  home: '/',
  episodes: '/episodes',
};

export default {
  home: '/',
  episodes: (day: number, month: number): string => {
    return `/episodes?day=${day}&month=${month}`;
  },
};
