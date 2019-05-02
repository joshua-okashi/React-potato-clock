import React, { Component } from 'react'
import { Input,Icon } from 'antd';
import './TodoInput.scss'



interface ITodoInputState {
  description: string;
}

interface ITodoInputProps {
  addTodo: (params: any) => void
}

export default class TodoInput extends Component<ITodoInputProps,ITodoInputState> {
  constructor(props:any){
    super(props)
    this.state = {
      description: ''
    }
  }

  onKeyUp = (e:any) => {
    if(e.keyCode === 13 && this.state.description !== '') {
      this.addTodo()
    }
  }

  addTodo = () =>{
    this.props.addTodo({description : this.state.description})
    this.setState({description: ''})
  }
  
  render() {
    const {description} = this.state
    const suffix = description ? <Icon type="enter" onClick={this.addTodo}/> : <span/>
    return (
      <div>
        <Input 
        placeholder="添加事项" 
        value={description}
        suffix ={suffix}
        onChange={(e) =>{this.setState({description:e.target.value})}}
        onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
}
