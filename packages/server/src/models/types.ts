import { Document } from 'mongoose';
import { EpisodeKinds } from '@on-this-day/shared';

export interface YearDateDocument extends Document {
  month: number;
  day: number;
  description: string;
  events: EpisodeDocument['_id'][];
  births: EpisodeDocument['_id'][];
  deaths: EpisodeDocument['_id'][];
}

export interface KeywordDocument extends Document {
  title: string;
  href: string;
}

export interface EpisodeDocument extends Document {
  yearDate: YearDateDocument['_id'];
  year: number;
  month: number;
  day: number;
  kind: EpisodeKinds;
  description: string;
  keywords: KeywordDocument[];
}
