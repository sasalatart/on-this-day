import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { EpisodeKinds, YearDate } from '@on-this-day/shared';
import {
  Cake as CakeIcon,
  Close as CloseIcon,
  Star as StarIcon,
} from '@material-ui/icons';
import { yearDateVariables } from '../../../graphql/types/yearDate';
import { YEAR_DATE_QUERY } from '../../../graphql/queries';
import routes from '../../../routes';
import { Spinner, StyledTheme } from '../../common';
import Timeline from '../Timeline';
import Header from './Header';

type YearDateProps = {
  day: number;
  month: number;
};

type QueryResult = { yearDate: YearDate };

const TabsContainer = styled(Paper)`
  ${({ theme }: StyledTheme): string => `
    margin: 0 5px;
    ${theme.breakpoints.up('sm')} {
      margin: 0 25px;
    }
  `}
`;

export default function YearDateView({
  day,
  month,
}: YearDateProps): JSX.Element {
  const { t } = useTranslation();
  const { replace } = useHistory();

  const [currentTab, setCurrentTab] = useState<EpisodeKinds>(
    EpisodeKinds.events,
  );

  const { data, loading, error } = useQuery<QueryResult, yearDateVariables>(
    YEAR_DATE_QUERY,
    { variables: { input: { day, month } } },
  );

  useEffect(() => {
    if (error) replace(routes.home);
  }, [error, replace]);

  const handleTabChange = useCallback(
    (_e: ChangeEvent<{}>, value: EpisodeKinds) => setCurrentTab(value),
    [],
  );

  if (!data || loading) return <Spinner size="100px" margin="100px" />;

  const { yearDate } = data;
  return (
    <>
      <Header
        day={day}
        month={month}
        description={yearDate.description}
        episodesKind={currentTab}
      />

      <TabsContainer square>
        <Tabs onChange={handleTabChange} value={currentTab} variant="fullWidth">
          {Object.values(EpisodeKinds).map((kind) => {
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

const TAB_ICONS: Record<EpisodeKinds, React.FC> = {
  births: CakeIcon,
  deaths: CloseIcon,
  events: StarIcon,
};
