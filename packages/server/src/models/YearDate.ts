import mongoose, { Schema } from 'mongoose';
import { YearDateDocument } from './types';

const episodeRef = {
  type: Schema.Types.ObjectId,
  ref: 'Episode',
};

const yearDateSchema = new Schema({
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
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

export default mongoose.model<YearDateDocument>('YearDate', yearDateSchema);
