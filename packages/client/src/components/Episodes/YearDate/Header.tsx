import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import { format } from 'date-fns';
import { EpisodeKinds, YearDate } from '@on-this-day/shared';
import { PaperBox } from '../../common';

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export type TimelineHeaderProps = {
  episodesKind: EpisodeKinds;
} & Pick<YearDate, 'day' | 'month' | 'description'>;

export default function TimelineHeader({
  episodesKind,
  day,
  month,
  description,
}: TimelineHeaderProps): JSX.Element {
  const { t } = useTranslation();

  const writtenDescription = useMemo(() => {
    return description.split('\n').map((paragraph, index) => (
      <Typography key={index} align="justify" gutterBottom>
        {paragraph}
      </Typography>
    ));
  }, [description]);

  return (
    <PaperBox>
      <Typography variant="h2" align="center">
        {t(`episodes.${episodesKind}`)}
      </Typography>
      <Typography variant="h3" align="center" gutterBottom>
        {format(new Date(1992, month - 1, day), 'MMMM d')}
      </Typography>

      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography variant="h4">{t('description')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <DescriptionContainer>{writtenDescription}</DescriptionContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </PaperBox>
  );
}
