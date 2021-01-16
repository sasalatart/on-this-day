export type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export enum EpisodeKinds {
  events = 'events',
  births = 'births',
  deaths = 'deaths',
}

export interface YearDate {
  id: string;
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
  kw: Keyword[];
};

export interface ScrapedYearDate {
  description: string;
  events: ScrapedEpisode[];
  births: ScrapedEpisode[];
  deaths: ScrapedEpisode[];
}
