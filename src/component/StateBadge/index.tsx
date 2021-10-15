import React from 'react';
import { STATE } from '../../constant/task';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';
import classNames from 'classnames';
import { useCommonStyles } from '../../commonStyles';
import { useTranslation } from 'react-i18next';

export default function StateBadge({ state }: { state: string }) {
  const { t } = useTranslation();
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const getClass = (): {
    elementClass: string;
    label: string;
  } => {
    switch (state) {
      case STATE.TO_DO:
        return {
          elementClass: 'todoState',
          label: t('To Do'),
        };
      case STATE.DONE:
        return {
          elementClass: 'doneState',
          label: t('Done'),
        };

      default:
        return {
          elementClass: 'todoState',
          label: t('To Do'),
        };
    }
  };

  return (
    <div
      className={classNames(
        getClass().elementClass === 'todoState' && styles['todoContainer'],
        getClass().elementClass === 'doneState' && styles['doneContainer'],
      )}
    >
      <Typography
        variant='caption'
        className={classNames(
          commonStyles.fontWeightSemiBold,
          getClass().elementClass === 'todoState' && styles['todoState'],
          getClass().elementClass === 'doneState' && styles['doneState'],
        )}
      >
        {getClass().label}
      </Typography>
    </div>
  );
}
