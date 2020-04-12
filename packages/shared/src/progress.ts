import ProgressBar from 'progress';

export default function buildProgressBar(): ProgressBar {
  return new ProgressBar('[:bar] :percent', {
    total: 366,
    width: 50,
    incomplete: '.',
    head: '>',
  });
}
