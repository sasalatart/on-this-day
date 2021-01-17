import mongoose, { Document, Types } from 'mongoose';
import { EpisodeKind } from '@on-this-day/shared';

export interface YearDateDocument extends Document {
  _id: Types.ObjectId;
  month: number;
  day: number;
  description: string;
  events: EpisodeDocument['_id'][];
  births: EpisodeDocument['_id'][];
  deaths: EpisodeDocument['_id'][];
}

export type YearDateModel = mongoose.Model<YearDateDocument, {}>;

export interface KeywordDocument extends Document {
  title: string;
  href: string;
}

export interface EpisodeDocument extends Document {
  _id: Types.ObjectId;
  yearDate: YearDateDocument['_id'];
  year: number;
  month: number;
  day: number;
  kind: EpisodeKind;
  description: string;
  keywords: KeywordDocument[];
}

export type EpisodeModel = mongoose.Model<EpisodeDocument, {}>;
