import React, { Component } from 'react'
import { Input,Icon } from 'antd';
const { connect }= require('react-redux');
import {addTodo} from '../../redux/actions'
import axios from '../../config/axios'
import './TodoInput.scss'


interface ITodoInputState {
  description: string;
}

interface ITodoInputProps {
  addTodo: (payload: any) => any;
}

class TodoInput extends Component<ITodoInputProps,ITodoInputState> {
  constructor(props:any){
    super(props)
    this.state = {
      description: ''
    }
  }

  onKeyUp = (e:any) => {
    if(e.keyCode === 13 && this.state.description !== '') {
      this.postTodo()
    }
  }

  postTodo = async() =>{
    try{
      const response = await axios.post('todos',{description : this.state.description})
      this.props.addTodo(response.data.resource)
    }catch(e){
      throw new Error(e)
    }

    this.setState({description: ''})
  }
  
  render() {
    const {description} = this.state
    const suffix = description ? <Icon type="enter" onClick={this.postTodo}/> : <span/>
    return (
      <div className="TodoInput" id="TodoItem">
        <Input 
        placeholder="添加事项" 
        value={description}
        suffix ={suffix}
        onChange={(e:any) =>{this.setState({description:e.target.value})}}
        onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
}

const mapStateToProps = (state:any,ownProps:any) =>({
  ...ownProps
})

const mapDispatchToProps = {
  addTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoInput);