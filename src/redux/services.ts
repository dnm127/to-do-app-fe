import {
  GET_ALL_TASKS,
  GET_ONE_TASK,
  GET_ALL_CATEGORIES,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASKS,
} from '../constant/service';
const axios = require('axios');

// Task
export const getAllTasksService = ({
  offset,
  limit,
}: {
  offset?: number;
  limit?: number;
}) => {
  return axios.get(GET_ALL_TASKS, {
    params: {
      offset,
      limit,
    },
  });
};

export const getOneTaskService = ({ id }: { id: string }) => {
  return axios.get(`${GET_ONE_TASK}/${id}`);
};

export const addTaskService = ({
  title,
  description,
  priority,
  state,
  categoryId,
  newCategoryName,
}: {
  title: string;
  description: string;
  priority: number;
  state: string;
  categoryId: string;
  newCategoryName: string;
}) => {
  return axios.post(ADD_TASK, {
    title,
    description,
    priority,
    state,
    categoryId,
    newCategoryName,
  });
};

export const editTaskService = ({
  id,
  title,
  description,
  state,
  priority,
  categoryId,
  newCategoryName,
}: {
  id: string;
  title?: string;
  description?: string;
  state?: string;
  priority?: number;
  categoryId?: string;
  newCategoryName?: string;
}) => {
  // Request URL: http://localhost:8080/api/modify-task/610e6403d16e62148a7c3bf111

  // return axios.put(`${EDIT_TASK}/610e6403d16e62148a7c3bf0`, {
  return axios.put(`${EDIT_TASK}/${id}`, {
    title,
    description,
    priority,
    state,
    categoryId,
    newCategoryName,
  });
};

export const deleteTasksService = (ids: string[]) => {
  return axios.delete(DELETE_TASKS, {
    data: { ids },
  });
};

// Category
export const getAllCategoriesService = () => {
  return axios.get(GET_ALL_CATEGORIES);
};
