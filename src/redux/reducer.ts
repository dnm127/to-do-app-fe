import { createReducer } from '@reduxjs/toolkit';
import { clone } from 'lodash';
import { STATE, PRIORITY } from '../constant/task';
import { ITaskInitialState, ITask } from '../interfaces';
import {
  getAllTasksRequest,
  getAllTasksSuccess,
  getAllTasksFailure,
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllCategoriesFailure,
  handleSnackbar,
  getOneTaskRequest,
  getOneTaskSuccess,
  getOneTaskFailure,
  editTaskSuccess,
  deleteTasksSuccess,
  deleteTasksFailure,
} from './actions';

const initialState = {
  allTasks: [] as ITask[],
  loadingFetchTask: false,
  loadingFetchCategory: false,
  loadingFetchAllTasks: false,
  snackBar: {
    open: false,
    status: '',
    content: '',
  },
  taskModel: {
    title: '',
    description: '',
    state: STATE.TO_DO,
    priority: PRIORITY.MEDIUM,
    categoryId: '',
    newCategoryName: '',
  },
} as ITaskInitialState;

export const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(handleSnackbar, (state, action) => {
      const { open, status, content } = action.payload;
      return {
        ...state,
        snackBar: {
          open,
          status: status ? status : '',
          content: content ? content : '',
        },
      };
    })
    .addCase(getAllTasksRequest, (state, action) => {
      state.loadingFetchAllTasks = true;
    })
    .addCase(getAllTasksSuccess, (state, action) => {
      const { result } = action.payload;

      return {
        ...state,
        allTasks: [...result],
        loadingFetchAllTasks: false,
      };
    })
    .addCase(getAllTasksFailure, (state, action) => {
      state.loadingFetchAllTasks = false;
    })
    .addCase(getAllCategoriesRequest, (state, action) => {
      state.loadingFetchCategory = true;
    })
    .addCase(getAllCategoriesSuccess, (state, action) => {
      const { result } = action.payload;

      return {
        ...state,
        allCategories: [...result],
        loadingFetchCategory: false,
      };
    })
    .addCase(getAllCategoriesFailure, (state, action) => {
      state.loadingFetchCategory = false;
    })
    .addCase(getOneTaskRequest, (state, action) => {
      return {
        ...state,
        loadingFetchTask: true,
      };
    })
    .addCase(getOneTaskSuccess, (state, action) => {
      const { result } = action.payload;
      if (result.category) {
        // result.category.id = result.category._id ? result.category._id : '';
        // result.categoryId = result.category;
      }
      return {
        ...state,
        taskModel: {
          ...result,
          id: result._id,
          categoryId: result.category ? result.category : '',
        },
        loadingFetchTask: false,
      };
    })
    .addCase(getOneTaskFailure, (state, action) => {
      return {
        ...state,
        loadingFetchTask: true,
      };
    })
    .addCase(editTaskSuccess, (state, action) => {
      const { result } = action.payload;
      let allTasksCopy = clone(state.allTasks);
      allTasksCopy = allTasksCopy.map((task) => {
        if (task.id === result._id) {
          result.id = result._id;
          delete result._id;
          return result;
        } else {
          return task;
        }
      });

      return {
        ...state,
        allTasks: [...allTasksCopy],
      };
    })
    .addCase(deleteTasksSuccess, (state, action) => {
      const { result } = action.payload;
      let allTasksCopy = clone(state.allTasks);
      allTasksCopy = allTasksCopy.filter(
        (task) => !result.ids.includes(task.id),
      );
      return {
        ...state,
        allTasks: [...allTasksCopy],
      };
    })
    .addCase(deleteTasksFailure, (state, action) => {
      return {
        ...state,
      };
    });
});
