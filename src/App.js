import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var todos = [
  {
    todoTitle: 'My First To-Do',
    todoResponsible: 'John Lennon',
    todoDescription: 'strum the guitar',
    todoPriority: 'Medium'
  },
  {
    todoTitle: 'Today\'s To-Do',
    todoResponsible: 'Paul McCartney',
    todoDescription: 'write a song',
    todoPriority: 'High'
  }
]

//todos is the same as todos: todos - ES6

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleRemoveTodo(index) {
    this.setState({
      todos: this.state.todos.filter((e, i) => {
        return i !== index;
      })
    })
  }

  handleAddTodo(todo) {
    this.setState({todos: [...this.state.todos, todo]})
  }

  render() {
    return (
       <div className="container">

        <TodoInput onAddTodo={this.handleAddTodo}></TodoInput>
        <hr />

          <h4>To Do Count: <span className="badge">{this.state.todos.length}</span></h4>
          <ul className="list-group">
            {this.state.todos.map((todo, index) =>
              <li className="list-group-item" key={index}>
                <h4 className="list-group-item-heading">{todo.todoTitle}
                  <small>
                    <span className="label label-default">{todo.todoPriority}</span>
                  </small>
                </h4>
                  <p><span className="glyphicon glyphicon-user"></span> {todo.todoResponsible}</p>
                  <p>{todo.todoDescription}</p>
                <button className="btn btn-success btn-sm" onClick={this.handleRemoveTodo.bind(this, index)}><span className="glyphicon glyphicon-trash"></span> Delete</button>

              </li>
            )}
          </ul>
       </div>
    );
  }
}

class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'High'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddTodo(this.state);
    this.setState({
      todoTitle: '',
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'High'
    })
  }

    render() {
      return(
        <div>
          <h4>Add a To Do</h4>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputTodoTitle" className="col-sm-2 control-label">To Do</label>
              <div className="col-sm-10">
                <input name="todoTitle" type="text" className="form-control" id="inputTodoTitle"
                  value={this.state.todoTitle}
                  onChange={this.handleInputChange}
                  placeholder="Name the to do"
                >
                </input>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="inputTodoResponsible" className="col-sm-2 control-label">Responsible</label>
              <div className="col-sm-10">
                  <input name="todoResponsible" type="text" className="form-control" id="inputTodoResponsible"
                    value={this.state.todoResponsible}
                    onChange={this.handleInputChange}
                    placeholder="Who's to do is this?"
                  >
                  </input>
              </div>
           </div>

           <div className="form-group">
             <label htmlFor="inputTodoDesc" className="col-sm-2 control-label">Description</label>
             <div className="col-sm-10">
                 <textarea name="todoDescription" rows="3" className="form-control" id="inputTodoDesc"
                   value={this.state.todoDescription}
                   onChange={this.handleInputChange}
                   placeholder="Describe the to do"
                 >
                 </textarea>
             </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputTodoPriority" className="col-sm-2 control-label">Priority</label>
            <div className="col-sm-10">
                <select name="todoPriority" className="form-control" id="inputTodoPriority"
                  value={this.state.todoPriority}
                  onChange={this.handleInputChange}
                >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
                </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-success">Add To Do</button>

            </div>
          </div>
          </form>
        </div>



      )
  }
}

export default App;
