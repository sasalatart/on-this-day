import React, { useMemo } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import groupBy from 'lodash/groupBy';
import { Episode, EpisodeKinds } from '@on-this-day/shared';
import TimelineItem from './Item';

type TimelineProps = {
  episodes: Episode[];
  episodesKind: EpisodeKinds;
};

export default function Timeline({
  episodes,
  episodesKind,
}: TimelineProps): JSX.Element {
  const groupedEpisodes = useMemo(() => groupBy(episodes, 'year'), [episodes]);

  const sortedYears = useMemo(
    () => Object.keys(groupedEpisodes).sort((a, b) => +a - +b),
    [groupedEpisodes],
  );

  return (
    <VerticalTimeline>
      {sortedYears.map((year) => (
        <TimelineItem
          key={year}
          year={+year}
          episodes={groupedEpisodes[year]}
          episodesKind={episodesKind}
        />
      ))}
    </VerticalTimeline>
  );
}
