import { AnyAction, Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';
import { Tasks } from '../../models/task';
import { todoActionTypes, todoAction } from './todo.actions';

export class TodoState {
  tasks: Tasks = [];
}

const todoReducer: Reducer<TodoState, AnyAction> = (state = new TodoState(), action): TodoState => {
  switch (action.type) {
    // case getType(todoAction.fetchTasks.success):
    case todoActionTypes.FETCH_TASKS.SUCCESS: {
      const { payload } = action as ActionType<typeof todoAction.fetchTasks.success>;
      return { tasks: payload };
    }
    case todoActionTypes.FETCH_TASK.SUCCESS: {
      const { payload } = action as ActionType<typeof todoAction.fetchTask.success>;
      return {
        tasks: [
          ...state.tasks,
          payload,
        ],
      };
    }
    default: {
      return state;
    }
  }
};

export default todoReducer;
