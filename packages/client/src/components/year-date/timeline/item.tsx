import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Divider as MUIDivider } from '@material-ui/core';
import { blue, green, red } from '@material-ui/core/colors';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Episode, EpisodeKind } from '@on-this-day/shared';
import { EpisodeItem } from './episode';

interface Props {
  year: number;
  episodesKind: EpisodeKind;
  episodes: Episode[];
}

export function TimelineItem({
  year,
  episodesKind,
  episodes,
}: Props): JSX.Element {
  return (
    <VerticalTimelineElement
      date={year >= 0 ? String(year) : `${-year}BC`}
      iconStyle={{ background: EpisodeKindColors[episodesKind] }}
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

const EpisodeKindColors = {
  [EpisodeKind.events]: blue[500],
  [EpisodeKind.births]: green[500],
  [EpisodeKind.deaths]: red[500],
};

const Divider = styled(MUIDivider)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
