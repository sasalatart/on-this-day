import { UserInputError } from 'apollo-server-express';
import { mapValues } from 'lodash';
import { EpisodeKind, dayOfMonthSchema } from '@on-this-day/shared';
import { EpisodeDocument, YearDateDocument } from '../models';
import { QueryYearDateArgs } from '../type-defs';
import { Context } from '../types';

async function yearDate(
  _root: null,
  args: QueryYearDateArgs,
  ctx: Context,
): Promise<YearDateDocument | null> {
  await dayOfMonthSchema.validate(args.input).catch((err) => {
    throw new UserInputError(err.message);
  });

  return ctx.models.YearDate.findOne(args.input).orFail(
    new UserInputError(ctx.t('errors.dateNotFound')),
  );
}

function episodesResolverFactory(kind: EpisodeKind) {
  return async function episodes(
    root: YearDateDocument,
    _args: object,
    ctx: Context,
  ): Promise<EpisodeDocument[]> {
    return ctx.models.Episode.find({ _id: { $in: root[kind] } }).sort({
      year: 1,
    });
  };
}

module.exports = {
  Query: {
    yearDate,
  },
  YearDate: mapValues(EpisodeKind, episodesResolverFactory),
};
