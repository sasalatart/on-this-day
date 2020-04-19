import ProgressBar from 'progress';

export default function buildProgressBar({ total = 366 } = {}): ProgressBar {
  return new ProgressBar('[:bar] :percent', {
    total,
    width: 50,
    incomplete: '.',
    head: '>',
  });
}
