import fs from 'fs';
import path from 'path';
import Bluebird from 'bluebird';
import mongoose from 'mongoose';
import {
  buildProgressBar,
  monthNumbersByName,
  ScrapedEpisode,
  ScrapedYearDate,
  EpisodeKinds,
} from '@on-this-day/shared';
import connectDB, { chunkedOperations } from '../../db';
import models, { EpisodeDocument, YearDateDocument } from '../../models';

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'),
);

function isKeyof(
  obj: object,
  possibleKey: string,
): possibleKey is keyof object {
  return possibleKey in obj;
}

async function createYearDate(
  formattedDate: string,
): Promise<YearDateDocument | undefined> {
  const [monthName, day] = formattedDate.split('-');
  if (!isKeyof(data, formattedDate)) return undefined;

  const { description, events, births, deaths } = data[
    formattedDate
  ] as ScrapedYearDate;

  const dayMonthData = {
    day,
    month: monthNumbersByName[monthName],
  };

  const yearDate = await models.YearDate.create({
    ...dayMonthData,
    description,
  });

  function chunkedEpisodesCreation(
    episodes: ScrapedEpisode[],
    kind: EpisodeKinds,
  ): Promise<EpisodeDocument['_id'][]> {
    return chunkedOperations<ScrapedEpisode, EpisodeDocument>(
      episodes,
      async (episodesChunk) => {
        const createdEpisodes = await models.Episode.create(
          episodesChunk.map((scrapedEpisode) => ({
            yearDate: yearDate._id,
            kind,
            keywords: scrapedEpisode.kw,
            ...dayMonthData,
            ...scrapedEpisode,
          })),
        );
        return createdEpisodes.map(({ _id }) => _id);
      },
    );
  }

  const yearDateEpisodes = await Bluebird.props({
    events: chunkedEpisodesCreation(events, EpisodeKinds.events),
    births: chunkedEpisodesCreation(births, EpisodeKinds.births),
    deaths: chunkedEpisodesCreation(deaths, EpisodeKinds.deaths),
  });

  yearDate.set(yearDateEpisodes);
  return yearDate.save();
}

async function createYear(): Promise<void> {
  const progressBar = buildProgressBar();
  for (const formattedDate of Object.keys(data)) {
    await createYearDate(formattedDate);
    progressBar.tick();
  }
}

function handleExit(code = 0): never {
  mongoose.connection.close();
  process.exit(code);
}

async function seed(): Promise<void> {
  if (process.argv[2] !== '--force') {
    console.log('⏳ Checking if database is already populated...');
    const yearDates = await models.YearDate.countDocuments();

    if (yearDates > 0) {
      console.log('✅ Database is already populated. Will not run seed.');
      handleExit(0);
    }

    console.log('⏳ It seems the database is empty. Continuing with seed...');
  }

  console.log('⏳ Seeding data...');
  try {
    await mongoose.connection.db.dropDatabase();
    await createYear();
  } catch (error) {
    console.error(`🛑 Error: ${error}`);
    handleExit(1);
  }

  handleExit();
}

connectDB().then(seed);
