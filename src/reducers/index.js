const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export default function tasks(state = initialState, action) {

  switch(action.type){
    case 'FETCH_TASKS_STARTED': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'FETCH_TASKS_SUCCEEDED': {
      return {
        ...state, 
        isLoading: false,
        tasks: action.payload
      };
    }
    case 'FETCH_TASKS_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    case 'CREATE_TASK_SUCCEEDED': {
      return {
        ...state,
        tasks: state.tasks.concat(action.payload)
      } 
    }
    case 'UPDATE_TASK_SUCCEEDED': {

      const nextTasks = state.tasks.map(task => {
          if ( task.id === action.payload.id ) {
            return action.payload
          }
          return task
        });
        return {
          ...state,
          tasks: nextTasks
        };
    }
    default: { 
      return state
    }
  }
}
