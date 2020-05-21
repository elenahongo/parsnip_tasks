import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001';

export const CALL_API = 'CALL_API'

function makeCall({ endpoint, method = 'GET', body }) {
  const url = `${API_BASE_URL}${endpoint}`;
  
const params = {
  method: method,
  url,
  data: body,
  headers: {
    'Content-Type': 'application/json',
  },
};

return axios(params).then(resp => resp).catch(err => err);
}

const apiMiddleware = store => next => action => {
  const callApi = action[CALL_API]

  if (typeof callApi === 'undefined') {
    return next(action);
  }

  console.log(action[CALL_API])
  const [requestStartedType, successType, failureType] = callApi.types;
  next({type: requestStartedType});

  if(callApi.method === 'PUT') {
    console.log(store.getState().tasks.tasks)
    const task = getTaskById(store.getState().tasks.tasks, callApi.body.id)
    callApi.body = Object.assign({}, task, callApi.body.params);
  }

  return makeCall({
    method: callApi.method,
    body: callApi.body,
    endpoint: callApi.endpoint
  }).then(
    response => 
      next({
        type: successType,
        payload: response.data
      }),
      error => 
        next({
          type: failureType,
          error: error.message
        }),
  );
};

const getTaskById = (tasks, id, ) => {
  return tasks.find(task => task.id === id);
}

export default apiMiddleware;
