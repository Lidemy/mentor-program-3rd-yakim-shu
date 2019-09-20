import React from 'react';

const TodoInput = ({ value, onChangeContent, onAdd }) => {
  return (
    <div className="input-group mb-3 input-text">
      <input type="text" value={value} onChange={onChangeContent} className="form-control input_addTodo" />
      <button onClick={onAdd} className="ml-2 btn_add btn btn-outline-secondary">送出</button>
    </div>
  );
}

export default TodoInput;