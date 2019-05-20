import React, { Component } from 'react'
const { connect } = require("react-redux");
import './Statistics.scss'

interface IStatisticsProps{
  todos: any[];
}

class Statistics extends Component<IStatisticsProps> {
  constructor(props:any){
    super(props)
  }

  get finishedTodos(){
    return this.props.todos.filter(t =>t.completed && !t.deleted)
  }

  render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成{this.finishedTodos.length}个任务
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state:any,ownProps:any) =>({
  todos: state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics)