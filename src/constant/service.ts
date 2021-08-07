import { SERVICE_CONFIG } from '../config';

export const GET_ALL_TASKS = `${SERVICE_CONFIG.apiRoot}/all-tasks`;
export const GET_ONE_TASK = `${SERVICE_CONFIG.apiRoot}/task`;
export const ADD_TASK = `${SERVICE_CONFIG.apiRoot}/add-task`;
export const EDIT_TASK = `${SERVICE_CONFIG.apiRoot}/modify-task`;
export const DELETE_TASKS = `${SERVICE_CONFIG.apiRoot}/delete-task`;
export const GET_ALL_CATEGORIES = `${SERVICE_CONFIG.apiRoot}/all-categories`;
