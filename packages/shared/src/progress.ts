import ProgressBar from 'progress';

export const buildProgressBar = ({ total = 366 } = {}): ProgressBar => {
  return new ProgressBar('[:bar] :percent', {
    total,
    width: 50,
    incomplete: '.',
    head: '>',
  });
};
