import React from 'react';
import { PRIORITY } from '../../constant/task';
import { Tooltip, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import classNames from 'classnames';
import { useCommonStyles } from '../../commonStyles';

export default function PriorityTag({ priority }: { priority: number }) {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const getClass = (): {
    elementClass: string;
    label: string;
    tooltip: string;
  } => {
    switch (priority) {
      case PRIORITY.HIGH:
        return {
          elementClass: 'highPriority',
          tooltip: 'High Priority',
          label: '!!!',
        };
      case PRIORITY.MEDIUM:
        return {
          elementClass: 'mediumPriority',
          tooltip: 'Medium Priority',
          label: '!!',
        };
      case PRIORITY.LOW:
        return {
          elementClass: 'lowPriority',
          tooltip: 'Low Priority',
          label: '!',
        };
      default:
        return {
          elementClass: 'mediumPriority',
          tooltip: 'Medium Priority',
          label: '!!',
        };
    }
  };

  return (
    <Tooltip title={getClass().tooltip}>
      <div
        className={classNames(
          getClass().elementClass === 'highPriority' && styles['highPriority'],
          getClass().elementClass === 'mediumPriority' &&
            styles['mediumPriority'],
          getClass().elementClass === 'lowPriority' && styles['lowPriority'],
          styles.priorityContainer,
        )}
      >
        <Typography
          variant='caption'
          className={classNames(commonStyles.fontWeightSemiBold)}
        >
          {getClass().label}
        </Typography>
      </div>
      {/* <FiberManualRecordIcon
        className={classNames(
          getClass().elementClass === 'highPriority' && styles['highPriority'],
          getClass().elementClass === 'mediumPriority' &&
            styles['mediumPriority'],
          getClass().elementClass === 'lowPriority' && styles['lowPriority'],
        )}
      /> */}
      {/* <div
        className={classNames(
          elementClass === 'highPriority' && styles['highPriority'],
          elementClass === 'mediumPriority' && styles['mediumPriority'],
          elementClass === 'lowPriority' && styles['lowPriority'],
        )}
      ></div> */}
    </Tooltip>
  );
}
