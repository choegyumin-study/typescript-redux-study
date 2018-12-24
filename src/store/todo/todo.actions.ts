import { Task, TaskId, Tasks } from '../../models/task';
import { createAsyncAction, createAsyncActionTypes } from '../helpers';

export const todoActionTypes = {
  FETCH_TASKS: createAsyncActionTypes('@@todo/FETCH_TASKS'),
  FETCH_TASK: createAsyncActionTypes('@@todo/FETCH_TASK'),
  CREATE_TASK: createAsyncActionTypes('@@todo/CREATE_TASK'),
  UPDATE_TASK: createAsyncActionTypes('@@todo/UPDATE_TASK'),
  DELETE_TASK: createAsyncActionTypes('@@todo/DELETE_TASK'),
};

// @todo 이 액션을 타입으로도 만들 방법이 없을까? 매번 `typeof todoAction.*.*`를 써야하는데..
export const todoAction = {
  fetchTasks: createAsyncAction(todoActionTypes.FETCH_TASKS)<void, void, Tasks, void, Error, void>(),
  fetchTask: createAsyncAction(todoActionTypes.FETCH_TASK)<TaskId, void, Task, void, Error, void>(),
  createTask: createAsyncAction(todoActionTypes.CREATE_TASK)<Task, void, Task, void, Error, void>(),
  updateTask: createAsyncAction(todoActionTypes.UPDATE_TASK)<Task, void, Task, void, Error, void>(),
  deleteTask: createAsyncAction(todoActionTypes.DELETE_TASK)<TaskId, void, void, void, Error, void>(),
};
