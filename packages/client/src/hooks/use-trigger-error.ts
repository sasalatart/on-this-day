import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import { routes } from '../routes';

interface Trigger {
  ({ message, key }: TriggerArgs): void;
}

interface TriggerArgs {
  message?: string;
  key?: string;
}

export function useTriggerError(): Trigger {
  const { t } = useTranslation();
  const { replace } = useHistory();

  const trigger = useCallback(
    ({ message, key }: TriggerArgs) => {
      swal.fire({
        title: t('error'),
        text: message || t(key as string),
        icon: 'error',
      });
      replace(routes.home);
    },
    [replace, t],
  );

  return trigger;
}
