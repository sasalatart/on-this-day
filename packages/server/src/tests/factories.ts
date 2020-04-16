import Bluebird from 'bluebird';
import { Document, Types as MongooseTypes } from 'mongoose';
import { Factory } from 'rosie';
import { nanoid } from 'nanoid';
import _ from 'lodash';
import { EpisodeKinds } from '@on-this-day/shared';
import models, { YearDateDocument, EpisodeDocument } from '../models';

function idOfResource(
  resource?: Document | MongooseTypes.ObjectId,
): MongooseTypes.ObjectId | undefined {
  if (!resource) return undefined;
  if ('id' in resource) return resource.id;
  return resource as MongooseTypes.ObjectId;
}

Factory.define('yearDate', models.YearDate)
  .attr('month', 1)
  .attr('day', 1)
  .attr('description', nanoid);

Factory.define('episode', models.Episode)
  .attr('yearDate', idOfResource)
  .attr('year', 1)
  .attr('month', 1)
  .attr('day', 1)
  .attr('kind', EpisodeKinds.events)
  .attr('description', nanoid);

export async function createEpisode(
  attrs?: Partial<EpisodeDocument>,
): Promise<EpisodeDocument> {
  return Factory.build('episode', attrs).save();
}

export async function createYearDate(
  attrs?: Partial<YearDateDocument>,
  numberOfEpisodesByKind = _.mapValues(EpisodeKinds, () => 0),
): Promise<{
  yearDate: YearDateDocument;
  episodes: Record<EpisodeKinds, EpisodeDocument[]>;
}> {
  const yearDate = await Factory.build('yearDate', attrs).save();
  const episodesByKind = await Bluebird.props(
    _.mapValues(numberOfEpisodesByKind, (amount, kind) => {
      return Promise.all(
        _.times(amount, () =>
          createEpisode({
            yearDate,
            month: yearDate.month,
            day: yearDate.day,
            kind: kind as EpisodeKinds,
          }),
        ),
      );
    }),
  );
  yearDate.set(
    _.mapValues(episodesByKind, (episodes) => _.map(episodes, '_id')),
  );
  await yearDate.save();
  return { yearDate, episodes: episodesByKind };
}

export default Factory;
