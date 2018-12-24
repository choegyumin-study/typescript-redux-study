import { delay } from 'redux-saga';
import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { Task, Tasks } from '../../models/task';
import { todoActionTypes, todoAction } from './todo.actions';

function* fetchTasksSaga() {
  try {
    yield delay(1000);
    const data: Tasks = [
      new Task({ id: 'foo', content: 'Hello,' }),
      new Task({ id: 'bar', content: 'World!' }),
    ];

    yield put(todoAction.fetchTasks.success(data));
  } catch (err) {
    yield put(todoAction.fetchTasks.failure(err));
  }
}

function* fetchTaskSaga(action: ActionType<typeof todoAction.fetchTask.request>) {
  try {
    yield delay(1000);
    const data: Task = new Task({ id: action.payload, content: 'qwerasdfzxcv' });

    yield put(todoAction.fetchTask.success(data));
  } catch (err) {
    yield put(todoAction.fetchTask.failure(err));
  }
}

export default function* todoSaga() {
  yield all([
    takeLatest(todoActionTypes.FETCH_TASKS.REQUEST, fetchTasksSaga),
    takeLatest(todoActionTypes.FETCH_TASK.REQUEST, fetchTaskSaga),
  ]);
}
