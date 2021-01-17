import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@material-ui/core';
import { format } from 'date-fns';
import { EpisodeKind, YearDate } from '@on-this-day/shared';
import { PaperBox } from '../common';

type Props = {
  episodesKind: EpisodeKind;
} & Pick<YearDate, 'day' | 'month' | 'description'>;

export function TimelineHeader({
  episodesKind,
  day,
  month,
  description,
}: Props): JSX.Element {
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
      <Typography id="timeline-title" variant="h2" align="center">
        {t(`episodes.${episodesKind}`)}
      </Typography>

      <Typography
        id="timeline-subtitle"
        variant="h3"
        align="center"
        gutterBottom
      >
        {format(new Date(1992, month - 1, day), 'MMMM d')}
      </Typography>

      <Accordion>
        <AccordionSummary>
          <Typography id="timeline-description" variant="h4">
            {t('description')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column">
            {writtenDescription}
          </Box>
        </AccordionDetails>
      </Accordion>
    </PaperBox>
  );
}
