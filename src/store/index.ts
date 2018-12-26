import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import asyncReducer, { AsyncState } from './async/async.reducer';
import todoReducer, { TodoState } from './todo/todo.reducer';
import todoSaga from './todo/todo.saga';

export * from './async/async.reducer';
export * from './async/async.selectors';

export * from './todo/todo.actions';
export * from './todo/todo.reducer';

export * from '../models/task';

// The top-level state object
export interface ApplicationState {
  loading: AsyncState;
  todo: TodoState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
  loading: asyncReducer,
  todo: todoReducer,
});

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([
    fork(todoSaga),
  ]);
}
