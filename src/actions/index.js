import * as api from '../api';
import {CALL_API} from '../middleware/api';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

export function fetchTasks () {
  return {
    [CALL_API]: {
      types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
      endpoint: '/tasks',
    },
  }
};

export const CREATE_TASK_STARTED = 'CREATE_TASK_STARTED';
export const CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED';
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED';

export function createTask({ title, description, status='Unstarted' }) {
  return {
    [CALL_API]: {
      types: [CREATE_TASK_STARTED, CREATE_TASK_SUCCEEDED, CREATE_TASK_FAILED],
      endpoint: '/tasks',
      method: 'POST',
      body: {
        title, 
        description,
        status,
      }, 
    },
  }; 
}

export const UPDATE_TASK_STARTED = 'UPDATE_TASK_STARTED';
export const UPDATE_TASK_SUCCEEDED = 'UPDATE_TASK_SUCCEEDED';
export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED';

export function changeStatus(id, params = {}) {    
   return {
     [CALL_API]: {
      types: [UPDATE_TASK_STARTED, UPDATE_TASK_SUCCEEDED, UPDATE_TASK_FAILED],
      method: 'PUT',
      body: {
        id: id,
        params: params
      },
      endpoint: `/tasks/${id}`
    } 
  } 
}

