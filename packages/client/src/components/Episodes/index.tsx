import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { validationsSchemas } from '@on-this-day/shared';
import { useTriggerError } from '../../hooks';
import YearDate from './YearDate';

export default function Episodes(): JSX.Element | null {
  const { search } = useLocation();
  const [isValidDate, setIsValidDate] = useState(false);
  const triggerError = useTriggerError();

  const { day, month } = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    return {
      day: searchParams.get('day'),
      month: searchParams.get('month'),
    };
  }, [search]);

  useEffect(() => {
    try {
      validationsSchemas.dayOfMonth.validateSync({ day, month });
      setIsValidDate(true);
    } catch (err) {
      triggerError({ key: 'errors.invalidDate' });
    }
  }, [day, month, triggerError]);

  if (!day || !month || !isValidDate) return null;

  return <YearDate day={+day} month={+month} />;
}
