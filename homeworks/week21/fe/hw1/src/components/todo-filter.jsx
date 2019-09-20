import React from 'react';

const TodoFilter = ({ onChangeFilter, todos, filter }) => {
  const currentTab = (type) => {
    console.log(filter);
    return filter === type ? '' : '-outline';
  }

  return (
    <div className="btn-group todo-filter">
      <button onClick={onChangeFilter} data-type='all'
        className={`btn btn-sm btn${currentTab('all')}-success`}
        type="button">所有</button>
      <button onClick={onChangeFilter} data-type='compeleted'
        className={`btn btn-sm btn${currentTab('compeleted')}-success`}
        type="button">已完成</button>
      <p className="ml-2 mb-0">還有
        <span className="ml-2 mr-2 badge badge-pill badge-success">{todos.filter(todo => !todo.status).length}</span>
        件未完成任務
      </p>
    </div>
  );
}

export default TodoFilter;