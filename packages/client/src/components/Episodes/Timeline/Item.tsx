import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Divider as MUIDivider } from '@material-ui/core';
import { blue, green, red } from '@material-ui/core/colors';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Episode, EpisodeKinds } from '@on-this-day/shared';
import EpisodeItem from './Episode';

type TimelineItemProps = {
  year: number;
  episodesKind: EpisodeKinds;
  episodes: Episode[];
};

const episodeKindsColors = {
  [EpisodeKinds.events]: blue[500],
  [EpisodeKinds.births]: green[500],
  [EpisodeKinds.deaths]: red[500],
};

const Divider = styled(MUIDivider)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function TimelineItem({
  year,
  episodesKind,
  episodes,
}: TimelineItemProps): JSX.Element {
  return (
    <VerticalTimelineElement
      date={year >= 0 ? String(year) : `${-year}BC`}
      iconStyle={{ background: episodeKindsColors[episodesKind] }}
    >
      {episodes.length === 1 ? (
        <EpisodeItem episode={episodes[0]} />
      ) : (
        episodes.map((episode, index) => (
          <Fragment key={episode.id}>
            <EpisodeItem episode={episode} />
            {index !== episodes.length - 1 && <Divider />}
          </Fragment>
        ))
      )}
    </VerticalTimelineElement>
  );
}
