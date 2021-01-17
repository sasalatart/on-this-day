import Bluebird from 'bluebird';
import { map, mapValues, times } from 'lodash';
import { Types as MongooseTypes } from 'mongoose';
import { nanoid } from 'nanoid';
import { Factory } from 'rosie';
import { EpisodeKind } from '@on-this-day/shared';
import models, { YearDateDocument, EpisodeDocument } from '../models';

Factory.define('yearDate', models.YearDate)
  .attr('month', 1)
  .attr('day', 1)
  .attr('description', nanoid);

Factory.define('episode', models.Episode)
  .attr('yearDate', () => new MongooseTypes.ObjectId())
  .attr('year', 1)
  .attr('month', 1)
  .attr('day', 1)
  .attr('kind', EpisodeKind.events)
  .attr('description', nanoid);

export async function createEpisode(
  attrs?: Partial<EpisodeDocument>,
): Promise<EpisodeDocument> {
  return Factory.build('episode', attrs).save();
}

export async function createYearDate(
  attrs?: Partial<YearDateDocument>,
  numberOfEpisodesByKind = mapValues(EpisodeKind, () => 0),
): Promise<{
  yearDate: YearDateDocument;
  episodes: Record<EpisodeKind, EpisodeDocument[]>;
}> {
  const yearDate = await Factory.build('yearDate', attrs).save();
  const episodesByKind = await Bluebird.props(
    mapValues(numberOfEpisodesByKind, (amount, kind) => {
      return Promise.all(
        times(amount, () =>
          createEpisode({
            yearDate: yearDate._id,
            month: yearDate.month,
            day: yearDate.day,
            kind: kind as EpisodeKind,
          }),
        ),
      );
    }),
  );
  yearDate.set(mapValues(episodesByKind, (episodes) => map(episodes, '_id')));
  await yearDate.save();
  return { yearDate, episodes: episodesByKind };
}

export default Factory;
