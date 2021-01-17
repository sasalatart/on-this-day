import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { dayOfMonthSchema } from '@on-this-day/shared';
import { useTriggerError } from '../../../hooks';

type ValidationStatus = 'validating' | 'ok' | 'error';

interface ValidationResult {
  day: number;
  month: number;
  validationStatus: ValidationStatus;
}

export function useValidateYearDate(): ValidationResult {
  const { search } = useLocation();
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>(
    'validating',
  );
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
      dayOfMonthSchema.validateSync({ day, month });
      setValidationStatus('ok');
    } catch (err) {
      setValidationStatus('error');
      triggerError({ key: 'errors.invalidDate' });
    }
  }, [day, month, triggerError]);

  return {
    day: day ? +day : 0,
    month: month ? +month : 0,
    validationStatus,
  };
}
