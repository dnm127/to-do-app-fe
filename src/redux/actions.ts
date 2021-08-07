import { createAction } from '@reduxjs/toolkit';
import { ITask, ICategory, ITaskInitialState } from '../interfaces';
import {
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  GET_ALL_TASKS_FAILURE,
  GET_ALL_TASKS_REQUEST,
  GET_ALL_TASKS_SUCCESS,
  GET_ONE_TASK_REQUEST,
  GET_ONE_TASK_SUCCESS,
  GET_ONE_TASK_FAILURE,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCESS,
  GET_ALL_CATEGORIES_FAILURE,
  SNACK_BAR,
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCESS,
  EDIT_TASK_FAILURE,
  DELETE_TASKS_REQUEST,
  DELETE_TASKS_FAILURE,
  DELETE_TASKS_SUCCESS,
} from './types';

// SNACKBAR
export const handleSnackbar = createAction(
  SNACK_BAR,
  function prepare({
    open,
    status,
    content,
  }: {
    open: boolean;
    status?: string;
    content?: string;
  }) {
    return {
      payload: {
        open,
        status,
        content,
      },
    };
  },
);

// TASK
export const getAllTasksRequest = createAction(GET_ALL_TASKS_REQUEST);
export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  function prepare(result: ITask[]) {
    return {
      payload: {
        result,
      },
    };
  },
);
export const getAllTasksFailure = createAction(GET_ALL_TASKS_FAILURE);

export const addTaskRequest = createAction(
  ADD_TASK_REQUEST,
  function prepare({
    title,
    description,
    priority,
    state,
    categoryId,
    newCategoryName,
    callback,
  }: {
    title: string;
    description: string;
    priority: number;
    state: string;
    categoryId: string;
    newCategoryName: string;
    callback: Function;
  }) {
    return {
      payload: {
        title,
        description,
        priority,
        state,
        categoryId,
        newCategoryName,
        callback,
      },
    };
  },
);

export const addTaskSuccess = createAction(ADD_TASK_SUCCESS);
export const addTaskFailure = createAction(ADD_TASK_FAILURE);

export const getOneTaskRequest = createAction(
  GET_ONE_TASK_REQUEST,
  function prepare(id: string) {
    return {
      payload: { id },
    };
  },
);
export const getOneTaskSuccess = createAction(
  GET_ONE_TASK_SUCCESS,
  function prepare(result: ITaskInitialState['taskModel']) {
    return {
      payload: {
        result,
      },
    };
  },
);
export const getOneTaskFailure = createAction(GET_ONE_TASK_FAILURE);

export const editTaskRequest = createAction(
  EDIT_TASK_REQUEST,
  function prepare({
    id,
    title,
    description,
    state,
    priority,
    categoryId,
    newCategoryName,
    callback,
  }: {
    id: string;
    title?: string;
    description?: string;
    state?: string;
    priority?: number;
    categoryId?: string;
    newCategoryName?: string;
    callback?: Function;
  }) {
    return {
      payload: {
        id,
        title,
        description,
        state,
        priority,
        categoryId,
        newCategoryName,
        callback,
      },
    };
  },
);
export const editTaskSuccess = createAction(
  EDIT_TASK_SUCESS,
  function prepare(result: any) {
    return {
      payload: { result },
    };
  },
);
export const editTaskFailure = createAction(EDIT_TASK_FAILURE);

export const deleteTasksRequest = createAction(
  DELETE_TASKS_REQUEST,
  function prepare(ids: string[]) {
    return {
      payload: {
        ids,
      },
    };
  },
);

export const deleteTasksSuccess = createAction(
  DELETE_TASKS_SUCCESS,
  function prepare(result: any) {
    return {
      payload: { result },
    };
  },
);

export const deleteTasksFailure = createAction(DELETE_TASKS_FAILURE);

// CATEGORY
export const getAllCategoriesRequest = createAction(GET_ALL_CATEGORIES_REQUEST);
export const getAllCategoriesSuccess = createAction(
  GET_ALL_CATEGORIES_SUCESS,
  function prepare(result: ICategory[]) {
    return {
      payload: {
        result,
      },
    };
  },
);
export const getAllCategoriesFailure = createAction(GET_ALL_CATEGORIES_FAILURE);
