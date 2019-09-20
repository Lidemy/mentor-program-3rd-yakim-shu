import React, { Component } from 'react';
import TodoList from './components/todo-list';
import TodoInput from './components/todo-input';
import TodoFilter from './components/todo-filter';
import './todo.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.id = 0;
  }

  getCurrentTime = (onlyDate) => {
    const addZeroBefore = (n) => (n < 10 ? '0' : '') + n;
    const now = new Date();
    const date = `${now.getMonth() + 1}/${now.getDate()}`;
    const time = `${addZeroBefore(now.getHours())}:${addZeroBefore(now.getMinutes())}`;
    return onlyDate ? date : `${date}  ${time}`;
  }

  state = {
    todos: [
      {
        id: 0,
        content: '沒內容我就會出現唷！',
        status: 0,
        isEditing: false,
        time: this.getCurrentTime(),
      }
    ],
    newContent: '',
    filter: 'all',
    id: 0
  }

  // 初始化
  componentDidMount() {
    const todoData = localStorage.getItem('todo');
    if (todoData && todoData !== '[]') {
      const oldTodos = JSON.parse(todoData);
      this.setState({
        todos: oldTodos,
      })
      this.id = oldTodos[oldTodos.length - 1].id + 1;
    }
  }

  // 更新過後
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.todos);
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todo', JSON.stringify(this.state.todos));
    }
  }



  getContent = (e) => {
    this.setState({
      newContent: e.target.value
    });
  }

  handleAdd = () => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: this.id + 1,
          content: this.state.newContent,
          status: 0,
          isEditing: false,
          time: this.getCurrentTime(),
        }
      ],
      newContent: '',
    })
    this.id++;
  }

  handleDelete = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }


  handleToggle = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        return todo.id !== id ? todo : {
          ...todo,
          status: Number(!todo.status)
        }
      })
    })
  }

  handleFilter = (e) => {
    this.setState({
      filter: e.target.dataset.type
    })
  }

  handleEditStatus = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        return todo.id !== id ? todo : {
          ...todo,
          isEditing: !todo.isEditing
        }
      })
    })
  }

  handleEdit = (e, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        return todo.id !== id ? todo : {
          ...todo,
          content: e.target.value
        }
      })
    })
  }

  render() {
    const { todos, newContent, filter } = this.state;
    return (
      <React.Fragment>

        <main className="main">
          <div className="card-body">
            <h1>Today
          <span className="ml-2">{this.getCurrentTime(true)}</span>
            </h1>
            <TodoInput value={newContent} onAdd={this.handleAdd} onChangeContent={this.getContent} />
            <TodoFilter filter={filter} onChangeFilter={this.handleFilter} todos={todos} />


            <div className="todo-list">
              {
                todos
                  .filter(todo => filter === 'compeleted' ? todo.status : true)
                  .map(todo => (
                    <TodoList
                      key={todo.id}
                      todo={todo}
                      onEditStatus={this.handleEditStatus}
                      onEdit={this.handleEdit}
                      onDelete={this.handleDelete}
                      onToggle={this.handleToggle}
                    />
                  ))
              }
            </div>
          </div>
          <div className="description">
            <h4>Todo  List</h4>
            <p>此為 React 的練習作業，藉由基本的刪除、新增 Todo 功能去熟悉 React 的操作模式。</p>
          </div>
        </main>
        <div class="author">
          © Copyright 2019, Yakim.
          <button className="author-github"></button>
        </div>

      </React.Fragment>
    )
  }
}

export default App;
