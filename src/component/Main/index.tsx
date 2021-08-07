import React, { useEffect, useState } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { format, formatISO9075 } from 'date-fns';
import { ITask } from '../../interfaces';
import {
  getAllTasksSelector,
  loadingFetchTaskSelector,
  getSnackBarSelector,
} from '../../redux/selectors';
import {
  getAllCategoriesRequest,
  getAllTasksRequest,
  getOneTaskRequest,
} from '../../redux/actions';
import { useStyles } from './styles';
import { useCommonStyles } from '../../commonStyles';
import TaskBadge from '../TaskBadge';
import LoadingComponent from '../LoadingComponent';
import NewTaskPanel from '../NewTaskPanel';
import CustomSnackBar from '../CustomSnackbar';

export default function Main() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const allTasks: ITask[] = useSelector(getAllTasksSelector);
  const loading: boolean = useSelector(loadingFetchTaskSelector);
  const snackBar = useSelector(getSnackBarSelector);
  const [openNewTaskPanel, setOpenTaskPanel] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(getAllTasksRequest());
    dispatch(getAllCategoriesRequest());
  }, [dispatch]);

  const handleOpenNewTaskPanel = () => {
    setEditing(false);
    setOpenTaskPanel((prev) => !prev);
  };

  const handleOpenEditTaskPanel = (id: string) => {
    setEditing(true);
    setOpenTaskPanel(true);
    dispatch(getOneTaskRequest(id));
  };

  return (
    <div className={styles.main}>
      <CustomSnackBar {...snackBar} />
      <div className={styles.mainHeader}>
        <Typography
          variant='h3'
          className={classNames(commonStyles.fontWeightBold, styles.mainTitle)}
        >
          To Do List
        </Typography>
        <Typography variant='body2' className={styles.mainDate}>
          {format(new Date(), 'dd-MM-yyyy HH:mm')}
        </Typography>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className={styles.mainBody}>
          {allTasks.map((item) => {
            return (
              <TaskBadge
                key={item.id}
                {...item}
                onEditTask={handleOpenEditTaskPanel}
              />
            );
          })}
          <IconButton
            className={
              openNewTaskPanel
                ? styles.rotateButton
                : styles.openNewTaskDialogBtn
            }
            onClick={handleOpenNewTaskPanel}
          >
            <AddIcon fontSize='large' />
          </IconButton>
        </div>
      )}
      {openNewTaskPanel && (
        <NewTaskPanel
          open={openNewTaskPanel}
          onClose={() => setOpenTaskPanel(false)}
          onOpen={() => setOpenTaskPanel(true)}
          isEditing={editing}
        />
      )}
    </div>
  );
}
