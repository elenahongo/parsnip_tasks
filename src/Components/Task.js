import React from 'react';
import './Tasks.css'

const Task = props => {

  const TASK_STATUSES = [
    'Unstarted',
    'In Progress',
    'Completed'
    ]

  return (
    <div className='task'>
      <div className='taskheader'>
        <div>{props.task.title}</div>
        <select value={props.task.status} onChange={onChangeStatus} id="status">
          {TASK_STATUSES.map(element => (
            <option key={element} 
            value={element}>{element}</option>
          ))}                   
        </select>
      </div>
      <hr />
      <div className='task-body'>{props.task.description}</div>
    </div>
  );

  function onChangeStatus(e) {
    props.onChangeStatus(props.task.id, e.target.value)
  }
}
  
export default Task;
