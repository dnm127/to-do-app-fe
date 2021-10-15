// import { createSelector } from 'reselect';
import { ITaskInitialState, ITask, ICategory } from '../interfaces';

export const getSnackBarSelector = (
  state: ITaskInitialState,
): ITaskInitialState['snackBar'] => state.snackBar;

export const getAllTasksSelector = (state: ITaskInitialState): ITask[] =>
  state.allTasks;

export const loadingFetchTaskSelector = (state: ITaskInitialState): boolean =>
  state.loadingFetchAllTasks;

export const taskModelSelector = (
  state: ITaskInitialState,
): ITaskInitialState['taskModel'] => state.taskModel;

export const getAllCategoriesSelector = (
  state: ITaskInitialState,
): ICategory[] => state.allCategories;

export const loadingTasksWithOffsetSelector = (
  state: ITaskInitialState,
): boolean => state.loadingTasksWithOffset;

export const categoryFilterSelector = (state: ITaskInitialState): string =>
  state.filter.category;

export const stateFilterSelector = (state: ITaskInitialState): string =>
  state.filter.state;

export const priorityFilterSelector = (state: ITaskInitialState): number =>
  state.filter.priority;
