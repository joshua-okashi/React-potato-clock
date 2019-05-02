import React, { Component } from 'react'
import { Checkbox } from 'antd';


interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  update: (id:number,params: any) => void;

}

export default class TodoItem extends Component<any,ITodoItemProps> {
  constructor(props: any){
    super(props)

  }

  update = (params:any) => {
    this.props.update(this.componentDidCatch,params)
  }

  render() {
    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox checked={this.props.completed} 
                  onChange={e=> this.update({completed: e.target.checked})}
        />
        <span>{this.props.description}</span>
      </div>
    )
  }
}
