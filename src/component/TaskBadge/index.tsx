import React, { useState } from 'react';
import {
  Box,
  Typography,
  Popper,
  Fade,
  MenuList,
  MenuItem,
  Paper,
} from '@material-ui/core';

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { color } from '../../theme';
import { STATE } from '../../constant/task';
import { format } from 'date-fns';
import { useStyles } from './styles';
import PriorityTag from '../PriorityTag';
import classNames from 'classnames';
import { useCommonStyles } from '../../commonStyles';
import StateBadge from '../StateBadge';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deleteTasksRequest, editTaskRequest } from '../../redux/actions';

const CustomCheckbox = withStyles({
  root: {
    padding: 0,
    '&$checked': {
      color: color.color2,
    },
  },
  checked: {},
})((props: CheckboxProps) => (
  <Checkbox color='default' size='medium' {...props} />
));

export default function TaskBadge({
  id,
  title,
  priority,
  state,
  createdAt,
  category,
  onEditTask,
}: {
  id: string;
  title: string;
  priority: number;
  state: string;
  category: string;
  createdAt: Date;
  onEditTask: (id: string) => void;
}) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const isChecked = state === STATE.DONE;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickEdit = () => {
    onEditTask(id);
  };

  const handleCheckBadge = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if (checked) {
      dispatch(
        editTaskRequest({ id, state: STATE.DONE, categoryId: category }),
      );
    } else {
      dispatch(
        editTaskRequest({ id, state: STATE.TO_DO, categoryId: category }),
      );
    }
  };

  const handleClickDelete = () => {
    dispatch(deleteTasksRequest([id]));
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      className={styles.taskBadge}
      style={{
        opacity: state === STATE.DONE ? 0.5 : 1,
      }}
    >
      <CustomCheckbox checked={isChecked} onChange={handleCheckBadge} />

      <Box className={styles.taskTitleContainer}>
        <div>
          <Typography
            variant='h5'
            className={classNames(
              styles.taskTitle,
              commonStyles.fontWeightBold,
            )}
          >
            {title}
          </Typography>
        </div>
        <Box display='flex' alignItems='center' mt={2}>
          <Typography variant='body2' className={styles.taskCreatedDate}>
            {format(new Date(createdAt), 'PP')}
          </Typography>
          <PriorityTag priority={priority} />
          <StateBadge state={state} />
        </Box>
      </Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      {open && (
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement={'bottom-end'}
          transition
        >
          {({ TransitionProps }) => (
            <Paper>
              <Fade {...TransitionProps}>
                <MenuList>
                  <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
                </MenuList>
              </Fade>
            </Paper>
          )}
        </Popper>
      )}
    </Box>
  );
}
