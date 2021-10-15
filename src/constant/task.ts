import { ITaskPriority, ITaskState } from '../interfaces';

export const OTHERS = 'Others';

export const PRIORITY: ITaskPriority = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export const STATE: ITaskState = {
  TO_DO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

export const TASK_ACTION = {
  GET_ALL_TASKS_SUCCESS: 'All tasks fetched successfully',
  GET_ALL_TASKS_FAILURE: 'All tasks fetched unsuccessfully',
  ADD_NEW_TASK_SUCCESS: 'New task added successfully',
  ADD_NEW_TASK_FAILURE: 'New task added unsuccessfully',
  EDIT_TASK_SUCCESS: 'Task edited successfully',
  EDIT_TASK_FAILURE: 'Task edited unsuccessfully',
  DELETE_TASK_SUCCESS: 'Task deleted successfully',
  DELETE_TASK_FAILURE: 'Task deleted unsuccessfully',
};
