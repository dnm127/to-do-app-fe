import React, { useEffect, useState } from 'react';
import {
  Typography,
  IconButton,
  Switch,
  Box,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { format } from 'date-fns';
import { ITask } from '../../interfaces';
import {
  getAllTasksSelector,
  loadingFetchTaskSelector,
  getSnackBarSelector,
  loadingTasksWithOffsetSelector,
} from '../../redux/selectors';
import {
  getAllCategoriesRequest,
  getAllTasksOffsetRequest,
  getAllTasksRequest,
  getOneTaskRequest,
  handleSnackbar,
} from '../../redux/actions';
import { useStyles } from './styles';
import { useCommonStyles } from '../../commonStyles';
import TaskBadge from '../TaskBadge';
import LoadingComponent from '../LoadingComponent';
import NewTaskPanel from '../NewTaskPanel';
import CustomSnackBar from '../CustomSnackbar';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import { color } from '../../theme';
import { TASK_ACTION } from '../../constant/task';
import { enUS, vi } from 'date-fns/locale';
import FilterMenu from '../FilterMenu';

const LangSwitch = withStyles({
  root: {
    height: 42,
    width: 64,
  },
  switchBase: {
    color: color.color11,
    '&$checked': {
      color: color.color11,
    },
    '&$checked + $track': {
      backgroundColor: color.color12,
    },
  },
  checked: {},
  thumb: {
    height: 34,
    width: 34,
  },
  track: {
    color: 'black',
    backgroundColor: color.color2,
  },
})(Switch);

export default function Main() {
  const { t, i18n } = useTranslation();
  const styles = useStyles();
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const allTasks: ITask[] = useSelector(getAllTasksSelector);
  const loading: boolean = useSelector(loadingFetchTaskSelector);
  const snackBar = useSelector(getSnackBarSelector);
  const [openNewTaskPanel, setOpenTaskPanel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const loadingTasksWithOffset = useSelector(loadingTasksWithOffsetSelector);

  useEffect(() => {
    dispatch(getAllTasksRequest({ callback: getAllTaskCallback }));
    dispatch(getAllCategoriesRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isBottom) {
      setTimeout(() => {
        dispatch(
          getAllTasksOffsetRequest({
            offset: allTasks.length,
            callback: getAllTaskCallback,
          }),
        );
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);

  const getAllTaskCallback = (success: boolean) => {
    dispatch(
      handleSnackbar({
        open: true,
        status: success ? 'success' : 'error',
        content: success
          ? t(TASK_ACTION.GET_ALL_TASKS_SUCCESS)
          : t(TASK_ACTION.GET_ALL_TASKS_FAILURE),
      }),
    );
  };

  const handleOpenNewTaskPanel = () => {
    setEditing(false);
    setOpenTaskPanel((prev) => !prev);
  };

  const handleClickView = (id: string) => {
    dispatch(getOneTaskRequest(id, handleOpenTaskPanel));
  };

  const handleOpenTaskPanel = () => {
    setEditing(true);
    setOpenTaskPanel(true);
  };

  const handleSwitchLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('vn');
    } else {
      i18n.changeLanguage('en');
    }
  };

  const handleScroll = (e: any) => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  return (
    <div className={styles.main}>
      <CustomSnackBar {...snackBar} />
      <div className={styles.mainHeader}>
        <Typography
          variant='h3'
          className={classNames(commonStyles.fontWeightBold, styles.mainTitle)}
        >
          {t('To Do List')}
        </Typography>
        <Box display='flex' alignItems='center'>
          <Typography
            variant='body2'
            className={styles.mainDate}
            style={{ marginRight: 20, width: 155 }}
          >
            {format(new Date(), 'PP', {
              locale:
                i18n.language === 'en'
                  ? enUS
                  : i18n.language === 'vn'
                  ? vi
                  : enUS,
            })}
          </Typography>
          <LangSwitch
            color='primary'
            checked={i18n.language === 'vn'}
            size='medium'
            onChange={handleSwitchLanguage}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            icon={
              <div
                className={classNames(
                  styles.switchBtn,
                  commonStyles.fontWeightBold,
                )}
              >
                EN
              </div>
            }
            checkedIcon={
              <div
                className={classNames(
                  styles.switchBtn,
                  commonStyles.fontWeightBold,
                )}
              >
                VN
              </div>
            }
          />
        </Box>
        {/* <FilterMenu /> */}
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className={styles.mainBody} onWheel={handleScroll}>
          {allTasks.length > 0 &&
            allTasks.map((item) => {
              return (
                <TaskBadge
                  key={item.id}
                  {...item}
                  onViewTask={handleClickView}
                />
              );
            })}
          {allTasks.length === 0 && (
            <div style={{ textAlign: 'center', padding: 30 }}>
              <Typography variant='h4'>{t('No Tasks Available')}</Typography>
            </div>
          )}
          {loadingTasksWithOffset && (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress />
            </div>
          )}
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
