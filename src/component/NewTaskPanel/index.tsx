import React, { useState } from 'react';
import {
  SwipeableDrawer,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Button,
  Tooltip,
} from '@material-ui/core/';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { get, clone } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './styles';
import {
  taskModelSelector,
  getAllCategoriesSelector,
} from '../../redux/selectors';
import { OTHERS, PRIORITY, STATE, TASK_ACTION } from '../../constant/task';
import {
  addTaskRequest,
  editTaskRequest,
  getAllCategoriesRequest,
  handleSnackbar,
} from '../../redux/actions';

export default function NewTaskPanel({
  open,
  onClose,
  onOpen,
  isEditing,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  isEditing?: boolean;
}) {
  const { t } = useTranslation();
  const styles = useStyles();
  const dispatch = useDispatch();
  const taskModel = useSelector(taskModelSelector);
  const allCategories = useSelector(getAllCategoriesSelector);
  const [openNewCategoryForm, setOpenNewCategoryForm] = useState(false);
  const [taskData, setTaskData] = useState(
    isEditing
      ? taskModel
      : {
          title: 'New Task',
          description: '',
          state: STATE.TO_DO,
          priority: PRIORITY.MEDIUM,
          categoryId: '',
          newCategoryName: '',
        },
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    const value = event.target.value;
    if (property === 'newCategoryName') {
      setTaskData((prev) => ({
        ...prev,
        categoryId: '',
        [property]: value,
      }));
    } else {
      setTaskData((prev) => ({
        ...prev,
        [property]: value,
      }));
    }
  };

  const handleChangePriority = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    const property = event.target.name;
    setTaskData((prev) => ({
      ...prev,
      [property]: Number(value),
    }));
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const value = event.target.value;

    setTaskData((prev) => ({
      ...prev,
      newCategoryName: '',
      categoryId: value as string,
    }));
  };

  const handleSubmit = () => {
    const submitData = clone(taskData);
    if (
      (!submitData.categoryId || submitData.category === '') &&
      (!submitData.newCategoryName || submitData.newCategoryName === '')
    ) {
      submitData.newCategoryName = OTHERS;
    }
    isEditing
      ? dispatch(
          editTaskRequest({
            ...submitData,
            id: submitData.id ? submitData.id : '',
            callback: submitSuccessCallback,
          }),
        )
      : dispatch(
          addTaskRequest({
            ...submitData,
            callback: submitSuccessCallback,
          }),
        );
  };

  const submitSuccessCallback = (success: boolean) => {
    onClose();
    dispatch(getAllCategoriesRequest());
    isEditing
      ? dispatch(
          handleSnackbar({
            open: true,
            status: success ? 'success' : 'error',
            content: success
              ? t(TASK_ACTION.EDIT_TASK_SUCCESS)
              : t(TASK_ACTION.EDIT_TASK_FAILURE),
          }),
        )
      : dispatch(
          handleSnackbar({
            open: true,
            status: success ? 'success' : 'error',
            content: success
              ? t(TASK_ACTION.ADD_NEW_TASK_SUCCESS)
              : t(TASK_ACTION.ADD_NEW_TASK_FAILURE),
          }),
        );
  };

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      classes={{
        paper: styles.paper,
      }}
    >
      <div className={styles.formContainer}>
        <TextField
          id='title'
          label={t('Title')}
          name='title'
          value={t(taskData.title)}
          className={styles.formInput}
          onChange={handleChange}
        />
        <TextField
          id='description'
          name='description'
          label={t('Description')}
          multiline
          rows={15}
          value={taskData.description}
          className={styles.formInput}
          onChange={handleChange}
        />
        <div className={styles.priorityContainer}>
          <FormControl component='fieldset'>
            <FormLabel
              component='legend'
              classes={{ root: styles.radioGroupLabel }}
            >
              {t('Priority')}
            </FormLabel>
            <RadioGroup
              aria-label='gender'
              name='priority'
              value={taskData.priority}
              row={true}
              onChange={handleChangePriority}
            >
              <FormControlLabel
                value={1}
                control={<Radio classes={{ checked: styles.radioButton }} />}
                label={t('Low')}
              />
              <FormControlLabel
                value={2}
                control={<Radio classes={{ checked: styles.radioButton }} />}
                label={t('Medium')}
              />
              <FormControlLabel
                value={3}
                control={<Radio classes={{ checked: styles.radioButton }} />}
                label={t('High')}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          {!openNewCategoryForm ? (
            <FormControl className={styles.categorySelector}>
              <InputLabel id='category-selector-label'>
                {t('Select Category')}
              </InputLabel>
              <Select
                labelId='category-selector-label'
                id='category-selector'
                name='categoryId'
                onChange={handleChangeCategory}
                value={get(taskData, 'categoryId', '')}
              >
                <MenuItem value=''></MenuItem>
                {allCategories.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            <TextField
              id='newCategoryName'
              name='newCategoryName'
              label={t('New Category')}
              value={taskData.newCategoryName}
              className={styles.formInput}
              onChange={handleChange}
            />
          )}
        </div>
        <Button
          size='small'
          variant='contained'
          color='primary'
          onClick={() => setOpenNewCategoryForm((prev) => !prev)}
          className={styles.openNewCategoryForm}
        >
          {/* <AddIcon fontSize='small' /> */}
          {!openNewCategoryForm ? t('New Category') : t('Select a category')}
        </Button>
        <Tooltip title='Save'>
          <IconButton
            classes={{ root: styles.submitBtn }}
            onClick={handleSubmit}
          >
            <KeyboardArrowRightIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </div>
    </SwipeableDrawer>
  );
}
