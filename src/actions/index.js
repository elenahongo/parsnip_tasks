import * as api from '../api';


function createTaskSucceeded(task){
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: {
      task
    }
  }
}

export function createTask({ title, description, status='Unstarted' }) {
  return dispatch => {
    api.createTask({title, description, status}).then(resp => {
      dispatch(createTaskSucceeded(resp.data));
    });
  }
}

function changeStatusSucceeded(task) {
  return {
    type: 'UPDATE_TASK_SUCCEEDED',
    payload: {
      task
    }
  }
}

export function changeStatus(id, params = {}) {  
  return (dispatch, getState) => {   
    const task = getTaskById(getState().tasks, id)
    const taskUpdate = Object.assign({}, task, params)
    api.updateTask(id, taskUpdate).then((resp) => {
      dispatch(changeStatusSucceeded(resp.data));
    })
  }
}

const getTaskById = (tasks, id) => {
  return tasks.find(task => task.id === id);
}

function fetchTasksSucceeded (tasks) {
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: {
      tasks
    }
  }
}

export function fetchTasks () {
  return dispatch => {
    dispatch(fetchTasksStarted());
    api.fetchTasks().then(resp => {
     setTimeout(() => {
       dispatch(fetchTasksSucceeded(resp.data));
     }, 2000);
    })
    .catch(err => {
      dispatch(fetchTasksFailed(err.message));
    })
  };
};

function fetchTasksFailed(error){
  return {
    type: 'FETCH_TASKS_FAILED',
    payload: {
      error
    }
  };
}

function fetchTasksStarted () {
  return {
    type: 'FETCH_TASKS_STARTED'
  };
}