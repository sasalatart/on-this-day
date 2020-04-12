import mongoose, { Schema } from 'mongoose';
import { EpisodeKinds } from '@on-this-day/shared';
import { EpisodeDocument } from './types';

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
    index: true,
  },
  day: {
    type: Number,
    min: 1,
    max: 31,
    required: true,
    index: true,
  },
  kind: {
    type: String,
    enum: Object.values(EpisodeKinds),
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: [keyWordSchema],
});

export default mongoose.model<EpisodeDocument>('Episode', episodeSchema);
