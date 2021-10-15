import { get } from 'lodash';
import {
  addTaskService,
  deleteTasksService,
  editTaskService,
  getAllCategoriesService,
  getAllTasksService,
  getOneTaskService,
} from './services';
import {
  addTaskFailure,
  // addTaskSuccess,
  addTaskRequest,
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllTasksFailure,
  getAllTasksRequest,
  getAllTasksSuccess,
  getOneTaskRequest,
  getOneTaskSuccess,
  getOneTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  deleteTasksRequest,
  deleteTasksFailure,
  deleteTasksSuccess,
  addTaskSuccess,
  getAllTasksOffsetRequest,
  getAllTasksOffsetSuccess,
  getAllTasksOffsetFailure,
} from './actions';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ITask } from '../interfaces';

function* getAllTasksSaga(action: any): any {
  const { offset, limit, callback } = action.payload;
  try {
    const result = yield call(getAllTasksService, { offset, limit });
    if (!result.data.error) {
      const data = result.data.data.map((item: ITask) => {
        const id = item._id;
        delete item._id;
        return {
          ...item,
          id,
        };
      });

      yield put(getAllTasksSuccess(data));
      callback && callback(true);
    } else {
      yield put(getAllTasksFailure());
      callback && callback(false);
    }
  } catch (error) {
    console.log('Error', error);
    yield put(getAllTasksFailure());
    callback && callback(false);
  }
}

function* getOneTaskSaga(action: any): any {
  const { id, callback } = action.payload;
  try {
    const result = yield call(getOneTaskService, { id });
    if (!result.data.error) {
      const data = result.data.data;
      yield put(getOneTaskSuccess(data));
      callback && callback();
    } else {
      yield put(getOneTaskFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(getOneTaskFailure());
  }
}

function* getAllCategoriesSaga(): any {
  try {
    const result = yield call(getAllCategoriesService);
    if (result.data) {
      const data = result.data.map((item: ITask) => {
        const id = item._id;
        delete item._id;
        return {
          title: item.title,
          id,
        };
      });
      yield put(getAllCategoriesSuccess(data));
    }
  } catch (error) {
    yield put(getAllTasksFailure());
  }
}

function* addTaskRequestSaga(action: any): any {
  const { title, description, priority, state, categoryId, newCategoryName } =
    action.payload;
  const callbackAction = get(action.payload, 'callback', () => {
    console.log('default fn');
  });
  try {
    let result = yield call(addTaskService, {
      title,
      description,
      priority,
      state,
      categoryId,
      newCategoryName,
    });
    if (!result.data.error) {
      yield put(addTaskSuccess(result.data.data));
      // yield put(getAllTasksRequest({}));
      callbackAction(true);
    } else {
      yield put(addTaskFailure());
      callbackAction(false);
    }
  } catch (error) {
    yield put(addTaskFailure());
    callbackAction(false);
  }
}

function* editTaskRequestSaga(action: any): any {
  const {
    id,
    title,
    description,
    state,
    priority,
    categoryId,
    newCategoryName,
    callback,
  } = action.payload;
  try {
    const result = yield call(editTaskService, {
      id,
      title,
      description,
      state,
      priority,
      categoryId,
      newCategoryName,
    });
    if (!result.data.error) {
      yield put(editTaskSuccess(result.data.data));
      callback && callback(true);
    } else {
      yield put(editTaskFailure());
      callback && callback(false);
    }
  } catch (error) {
    console.log(error);
    yield put(editTaskFailure());
    callback && callback(false);
  }
}

function* deleteTaskRequestSaga(action: any): any {
  const { ids } = action.payload;
  try {
    const result = yield call(deleteTasksService, ids);
    if (!result.data.error) {
      yield put(deleteTasksSuccess(result.data.data));
    }
  } catch (error) {
    console.log(error);
    yield put(deleteTasksFailure());
  }
}

function* getAllTasksOffsetSaga(action: any): any {
  const { offset, limit, callback } = action.payload;
  try {
    const result = yield call(getAllTasksService, { offset, limit });
    if (!result.data.error) {
      const data = result.data.data.map((item: ITask) => {
        const id = item._id;
        delete item._id;
        return {
          ...item,
          id,
        };
      });

      yield put(getAllTasksOffsetSuccess(data));
      if (result.data.data.length > 0) {
        callback && callback(true);
      }
    } else {
      yield put(getAllTasksFailure());
      callback && callback(false);
    }
  } catch (error) {
    console.log('Error', error);
    yield put(getAllTasksOffsetFailure());
    callback && callback(false);
  }
}

export default function* taskSaga() {
  yield all([
    takeEvery(getAllTasksRequest, getAllTasksSaga),
    takeEvery(getAllTasksOffsetRequest, getAllTasksOffsetSaga),
    takeEvery(getOneTaskRequest, getOneTaskSaga),
    takeEvery(addTaskRequest, addTaskRequestSaga),
    takeEvery(editTaskRequest, editTaskRequestSaga),
    takeEvery(deleteTasksRequest, deleteTaskRequestSaga),
    takeEvery(getAllCategoriesRequest, getAllCategoriesSaga),
  ]);
}
