import mongoose, { Schema } from 'mongoose';
import { DAYS_BY_MONTH_NUMBER } from '@on-this-day/shared';
import { YearDateDocument } from './types';

const episodeRef = {
  type: Schema.Types.ObjectId,
  ref: 'Episode',
};

const yearDateSchema = new Schema({
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
  description: {
    type: String,
    required: true,
  },
  events: [episodeRef],
  births: [episodeRef],
  deaths: [episodeRef],
});

yearDateSchema.index({ day: 1, month: 1 }, { unique: true });

yearDateSchema.post<YearDateDocument>('remove', function postRemove(
  this: YearDateDocument,
) {
  return mongoose.models.Episode.deleteMany({ yearDate: this._id });
});

function validateDayOfMonth(this: YearDateDocument, value: number): boolean {
  return value <= DAYS_BY_MONTH_NUMBER[this.month];
}

export const YearDate = mongoose.model<YearDateDocument>(
  'YearDate',
  yearDateSchema,
);
