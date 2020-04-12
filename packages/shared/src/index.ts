export * from './dates';
export { default as buildProgressBar } from './progress';
export { default as locales } from './locales';
export { default as validationsSchemas } from './validations-schemas';

export enum EpisodeKinds {
  events = 'events',
  births = 'births',
  deaths = 'deaths',
}

export interface YearDate {
  description: string;
  day: number;
  month: number;
  events: Episode[];
  births: Episode[];
  deaths: Episode[];
}

export interface Keyword {
  title: string;
  href: string;
}

export interface Episode {
  id: string;
  year: number;
  month: number;
  day: number;
  kind: EpisodeKinds;
  description: string;
  keywords: Keyword[];
}

export type ScrapedEpisode = Pick<Episode, 'year' | 'description'> & {
  kw: [Keyword];
};

export type ScrapedYearDate = {
  description: string;
  events: ScrapedEpisode[];
  births: ScrapedEpisode[];
  deaths: ScrapedEpisode[];
};
