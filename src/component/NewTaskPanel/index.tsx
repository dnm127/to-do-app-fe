import React, { useState, useEffect } from 'react';
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

  // useEffect(() => {
  //   setTaskData({
  //     id: taskModel.id,
  //     title: taskModel.title,
  //     description: taskModel.description,
  //     state: taskModel.state,
  //     priority: taskModel.priority,
  //     categoryId: taskModel.categoryId,
  //     newCategoryName: taskModel.newCategoryName,
  //     category: taskModel.category,
  //   });
  // }, [taskModel]);

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

  const submitSuccessCallback = () => {
    onClose();
    dispatch(getAllCategoriesRequest());
    dispatch(
      handleSnackbar({
        open: true,
        status: 'success',
        content: isEditing
          ? TASK_ACTION.EDIT_TASK_SUCCESS
          : TASK_ACTION.ADD_NEW_TASK_SUCCESS,
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
          label='Title'
          name='title'
          value={taskData.title}
          className={styles.formInput}
          onChange={handleChange}
        />
        <TextField
          id='description'
          name='description'
          label='Description'
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
              Priority
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
                label='Low'
              />
              <FormControlLabel
                value={2}
                control={<Radio classes={{ checked: styles.radioButton }} />}
                label='Medium'
              />
              <FormControlLabel
                value={3}
                control={<Radio classes={{ checked: styles.radioButton }} />}
                label='High'
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          {!openNewCategoryForm ? (
            <FormControl className={styles.categorySelector}>
              <InputLabel id='category-selector-label'>
                Select Category
              </InputLabel>
              <Select
                labelId='category-selector-label'
                id='category-selector'
                name='categoryId'
                onChange={handleChangeCategory}
                // value={
                //   isEditing
                //     ? taskData?.category?.id
                //       ? taskData.category.id
                //       : ''
                //     : taskData.categoryId
                // }
                value={get(taskData, 'categoryId', '')}
              >
                <MenuItem value=''>None</MenuItem>
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
              label='New Category'
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
          {!openNewCategoryForm ? 'New category' : 'Select a category'}
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
