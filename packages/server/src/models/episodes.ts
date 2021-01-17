import mongoose, { Schema } from 'mongoose';
import { DAYS_BY_MONTH_NUMBER, EpisodeKind } from '@on-this-day/shared';
import { EpisodeDocument, YearDateDocument } from './types';
import { YearDate } from './year-dates';

const keyWordSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  { id: false },
);

export const episodeSchema = new Schema({
  yearDate: {
    type: Schema.Types.ObjectId,
    ref: 'YearDate',
    validate: {
      validator: validateYearDateConsistency,
      message: 'errors.yearDateConsistency',
    },
    required: true,
    index: true,
  },
  year: {
    type: Number,
    required: true,
    index: true,
  },
  month: {
    type: Number,
    min: 1,
    max: 12,
    required: true,
  },
  day: {
    type: Number,
    min: 1,
    max: 31,
    validate: {
      validator: validateDayOfMonth,
      message: 'errors.invalidDayForMonth',
    },
    required: true,
  },
  kind: {
    type: String,
    enum: Object.values(EpisodeKind),
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: [keyWordSchema],
});

episodeSchema.index({ day: 1, month: 1 });

function validateYearDateConsistency(
  this: EpisodeDocument,
  value: YearDateDocument['_id'],
): Promise<boolean> {
  return YearDate.exists({ _id: value, day: this.day, month: this.month });
}

function validateDayOfMonth(this: EpisodeDocument, value: number): boolean {
  return value <= DAYS_BY_MONTH_NUMBER[this.month];
}

export const Episode = mongoose.model<EpisodeDocument>(
  'Episode',
  episodeSchema,
);
