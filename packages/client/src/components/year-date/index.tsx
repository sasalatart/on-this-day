import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Box, CircularProgress, Paper, Tabs, Tab } from '@material-ui/core';
import { EpisodeKind, YearDate } from '@on-this-day/shared';
import {
  Cake as CakeIcon,
  Close as CloseIcon,
  Star as StarIcon,
} from '@material-ui/icons';
import { yearDateVariables } from '../../graphql/types/yearDate';
import { YEAR_DATE_QUERY } from '../../graphql/queries';
import { routes } from '../../routes';
import { StyledTheme } from '../common';
import { Timeline } from './timeline';
import { TimelineHeader } from './header';
import { useValidateYearDate } from './hooks';

interface Props {
  day: number;
  month: number;
}

type QueryResult = { yearDate: YearDate };

function YearDateDisplay({ day, month }: Props): JSX.Element {
  const { t } = useTranslation();
  const { replace } = useHistory();

  const [currentTab, setCurrentTab] = useState<EpisodeKind>(EpisodeKind.events);

  const { data, loading, error } = useQuery<QueryResult, yearDateVariables>(
    YEAR_DATE_QUERY,
    { variables: { input: { day, month } } },
  );

  useEffect(() => {
    if (error) replace(routes.home);
  }, [error, replace]);

  const handleTabChange = useCallback(
    (_e: ChangeEvent<{}>, value: EpisodeKind) => setCurrentTab(value),
    [],
  );

  if (!data || loading) {
    return (
      <Box display="flex" justifyContent="center" margin="100px">
        <CircularProgress size="100px" />
      </Box>
    );
  }

  const { yearDate } = data;
  return (
    <>
      <TimelineHeader
        day={day}
        month={month}
        description={yearDate.description}
        episodesKind={currentTab}
      />

      <TabsContainer square>
        <Tabs onChange={handleTabChange} value={currentTab} variant="fullWidth">
          {Object.values(EpisodeKind).map((kind) => {
            const Icon = TAB_ICONS[kind];
            return (
              <Tab
                key={kind}
                data-kind={kind}
                label={t(`episodes.${kind}`)}
                value={kind}
                icon={<Icon />}
              />
            );
          })}
        </Tabs>
      </TabsContainer>

      <Timeline episodes={yearDate[currentTab]} episodesKind={currentTab} />
    </>
  );
}

export function YearDateEpisodes(): JSX.Element | null {
  const { validationStatus, day, month } = useValidateYearDate();
  if (validationStatus !== 'ok') return null;

  return <YearDateDisplay day={day} month={month} />;
}

const TAB_ICONS: Record<EpisodeKind, React.FC> = {
  births: CakeIcon,
  deaths: CloseIcon,
  events: StarIcon,
};

const TabsContainer = styled(Paper)`
  ${({ theme }: StyledTheme): string => `
    margin: 0 5px;
    ${theme.breakpoints.up('sm')} {
      margin: 0 25px;
    }
  `}
`;
