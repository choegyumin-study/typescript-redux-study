import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Tasks } from '../models/task';
import { ApplicationState, todoAction } from '../store';

interface Props {
}

interface PropsFromState {
  tasks: Tasks;
}

interface PropsFromDispatch {
  fetchTasks: typeof todoAction.fetchTasks.request;
  fetchTask: typeof todoAction.fetchTask.request;
}

class Todo extends React.Component<Props & PropsFromState & PropsFromDispatch> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        To Do
        <button onClick={() => this.props.fetchTask(Math.random().toString(36).substring(2, 15))}>Load</button>
        <button onClick={() => this.props.fetchTasks()}>Load All</button>
        <ul>
          {this.props.tasks.map(task => (
            <li key={task.id}>
              {task.content}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ todo }: ApplicationState) => ({
  tasks: todo.tasks,
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
