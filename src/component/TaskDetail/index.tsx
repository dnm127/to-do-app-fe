import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { ITask } from '../../interfaces';
import { color } from '../../theme';
import { getOneTaskRequest } from '../../redux/actions';

const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: color.color2,
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color='default' {...props} />);

export default function TaskDetail({
  id,
  title,
  createdAt,
  priority,
  state,
}: ITask) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneTaskRequest(id));
  }, [id, dispatch]);

  return (
    <Box display='flex' alignItems='center'>
      <CustomCheckbox
        checked={true}
        // onChange={handleChange}
        name='checkedB'
        color='primary'
      />
      <div>{title}</div>
    </Box>
  );
}
