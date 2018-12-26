import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Tasks } from '../models/task';
import { ApplicationState, asyncSelectors, todoAction, todoActionTypes } from '../store';

interface OwnProps {
}

interface PropsFromState {
  tasks: Tasks;
  isFetching: boolean;
  error?: string;
}

interface PropsFromDispatch {
  fetchTasks: typeof todoAction.fetchTasks.request;
  fetchTask: typeof todoAction.fetchTask.request;
}

type Props = OwnProps & PropsFromState & PropsFromDispatch;

class Todo extends React.Component<Props> {
  public render(): React.ReactNode {
    const {fetchTask, fetchTasks, tasks, isFetching, error} = this.props;

    return (
      <React.Fragment>
        To Do
        {/*<button onClick={() => fetchTask(Math.random().toString(36).substring(2, 15))}>Load</button>*/}
        <button onClick={() => fetchTasks()}>Load All</button>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.content}
            </li>
          ))}
        </ul>
        <div>{isFetching ? (<div>Loading..</div>) : ''}</div>
        <pre><code>{error}</code></pre>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ loading, todo }: ApplicationState) => ({
  tasks: todo.tasks,
  isFetching: asyncSelectors.isFetching([todoActionTypes.FETCH_TASKS])(loading),
  error: asyncSelectors.error([todoActionTypes.FETCH_TASKS])(loading),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    fetchTasks: todoAction.fetchTasks.request,
    fetchTask: todoAction.fetchTask.request,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todo);
