import React, { Component } from 'react';
import TodoInput from './TodoInput';
import axios from "../../config/axios";
import './Todos.scss';
import TodoItem from './TodoItem';


interface ITodosState {
  todos: any[];
}

export default class Todos extends Component<any,ITodosState> {
  constructor(props:any){
    super(props)
    this.state = {
      todos: []
    }
  }

  addTodo = async (params: any)=>{
    const {todos} = this.state
    try{
      const response = await axios.post('todos',params)
      this.setState({todos: [response.data.resource,...todos]})
    }catch(e){
      // throw new Error(e)
      console.log(e)
    }
  }

  componentDidMount(){
    this.getTodos()
  }

  getTodos = async() => {
    try{
      const response = await axios.get('todos')
      this.setState({todos: response.data.resources})
    }catch(e){
       // throw new Error(e)
      console.log(e)
    }
  }

  updateTodo = async (id:number,params: any) => {
    const {todos} = this.state
    try{
      const response = await axios.put(`todos/${id}`,params)
      const newTodo = todos.map(t =>{
        if( id === t.id){
          return response.data.resource
        }else {
          return t
        }
      })
      this.setState({todos: newTodo})
    }catch(e){
      console.log(e)
    }
  }

  render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput addTodo={(params)=>this.addTodo(params) } />
        <main>
          {
            this.state.todos.map( t =>{
              <TodoItem key={t.id} {...t}
                updata={this.updateTodo}
              />
            })
          }
        </main>
      </div>
    )
  }
}
