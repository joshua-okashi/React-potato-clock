import React, { Component } from 'react';
const { connect } = require("react-redux");
import {initTodos,updateTodo} from '../../redux/actions'
import TodoInput from './TodoInput';
import axios from "../../config/axios";
import './Todos.scss';
import TodoItem from './TodoItem';



class Todos extends Component<any> {
  constructor(props: any) {
    super(props)
  }

  get unDeletedTodos() {
    return this.props.todos.filter((t:any) => !t.deleted)
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter((t:any) => !t.completed)
  }

  get CompletedTodos() {
    return this.unDeletedTodos.filter((t:any) => t.completed)
  }

  componentDidMount() {
    this.getTodos()
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos')
      const todos = response.data.resources.map((t: any) => Object.assign({}, t, { editing: false }))
      console.log(response.data)
      this.props.initTodos(todos)
    } catch (e) {
      throw new Error(e)
    }
  }


  render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput/>
        <div className="todoList">
          {
            this.unCompletedTodos.map((t:any) => {
              return (<TodoItem key={t.id} {...t}
              />)
            })
          }
          {
            this.CompletedTodos.map((t:any) => {
              return (<TodoItem key={t.id} {...t}

              />)
            })
          }
        </div>
      </div>
    )
  }
}
 
const mapStateToProps = (state:any,ownProps:any) =>({
  todos: state.todos,
  ...ownProps
})

const mapDispatchToProps = {
  initTodos,
  updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);