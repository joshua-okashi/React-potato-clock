import React, { Component } from 'react';
const { connect } = require("react-redux");
import {updateTodo} from '../../redux/actions/todos';
import TodoInput from './TodoInput';
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
          {/* {
            this.CompletedTodos.map((t:any) => {
              return (<TodoItem key={t.id} {...t}

              />)
            })
          } */}
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
  updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);