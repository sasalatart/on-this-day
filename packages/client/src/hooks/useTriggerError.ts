import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import routes from '../routes';

type TriggerProps = { message?: string; key?: string };
type Trigger = ({ message, key }: TriggerProps) => void;

export default function useTriggerError(): Trigger {
  const { t } = useTranslation();
  const { replace } = useHistory();

  const trigger = useCallback(
    ({ message, key }: TriggerProps) => {
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
