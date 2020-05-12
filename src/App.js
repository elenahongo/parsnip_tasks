import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskPage from './Components/TasksPage';
import { createTask, changeStatus, fetchTasks } from './actions';
import FlashMessage from './Components/FlashMessage';

class App extends Component {
  //adding an action handler
  onCreateTask = ({ title, description}) => {
    this.props.dispatch(createTask({title, description}));
  }

  onChangeStatus = ( id, status ) => {
     this.props.dispatch(changeStatus(id, { status }))
  }

  componentDidMount(){
    this.props.dispatch(fetchTasks());
  }

  render () {
    console.log('props from App: ', this.props)
    return (
      <div className='container'>
        {this.props.error && 
        <FlashMessage message={this.props.error} />}
        <div className='main-content'>
          <TaskPage 
            tasks={this.props.tasks} 
            onCreateTask={this.onCreateTask}
            onChangeStatus={this.onChangeStatus}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
const { tasks, isLoading, error } = state.tasks;
return { tasks, isLoading, error };
}

export default connect(mapStateToProps)(App);
