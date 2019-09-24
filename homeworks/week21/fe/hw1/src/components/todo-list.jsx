import React, { Component } from 'react';

class CheckBox extends Component {
  renderInput = (todo) => {
    if (todo.isEditing) {
      return <input type="text" className="todo-content" value={todo.content}
        onChange={(e) => this.props.onEdit(e, todo.id)}></input>;
    }
    return (
      <React.Fragment>
        <label>{todo.content}<em>{todo.time}</em></label>

      </React.Fragment>
    )
  }

  render() {
    const { changedStatus, todo } = this.props;
    return (
      <React.Fragment>
        <input type="checkbox" onChange={changedStatus} checked={todo.status} />
        {this.renderInput(todo)}
        <span className="checkbox"></span>
      </React.Fragment>
    );
  }
}


class TodoList extends Component {
  toggleTodo = (e, todo) => {
    // => 因為要排除 button & 編輯中狀態，所以獨立出來
    if (todo.isEditing || (e.target.tagName === 'BUTTON')) return false;
    this.props.onToggle(todo.id);
  }

  changedStatus = () => {
    console.log('changed');
  }

  render() {
    const { todo, onDelete, onEditStatus, onEdit } = this.props;
    return (
      <div className="item d-flex justify-content-between" onClick={(e) => this.toggleTodo(e, todo)}>
        <CheckBox todo={todo} changedStatus={this.changedStatus} onEdit={onEdit} />
        <div className="btn-area">
          <button onClick={() => onDelete(todo.id)}
            className="mr-2 btn btn_delete">
          </button>

          <button onClick={() => onEditStatus(todo.id)}
            className={`mr-2 btn btn_edit ${todo.isEditing ? 'isEditing' : ''}`}>
          </button>
          <button className={`badge badge-${todo.status ? 'secondary' : 'info'}`}>
            {todo.status ? '完成' : '未完成'}
          </button>
        </div>
      </div>
    )
  }
}

export default TodoList;
