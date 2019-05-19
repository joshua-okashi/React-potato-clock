import React, { Component } from 'react'
import './CountDown.scss'


interface ICountDownProps {
  timer: number;
  duration: number;
  onFinish: () => void;
}

interface ICountDownState {
  countDown: number;
}

let timerId:NodeJS.Timeout | null = null

export default class CountDown extends Component<ICountDownProps,ICountDownState> {
  constructor(props:any){
    super(props)
    this.state = {
      countDown: this.props.timer
    }
  }

  get countDown(){
    const min = Math.floor(this.state.countDown/1000/60)
    const second = Math.floor(this.state.countDown/1000%60)
    return `${min}:${second<10?`0${second}`:second}`
  }

  componentDidMount(){
    timerId = setInterval(()=>{
      let time = this.state.countDown
      this.setState({countDown: time - 1000})
      document.title = `${this.countDown} -番茄时间`
      if( time < 1000){
        document.title = '番茄时间'
        this.props.onFinish()
        clearInterval(Number(timerId))
      }
    },1000)
  }

  componentWillUnMount(){
    clearInterval(Number(timerId))
  }

  render() {
    const perent = 1- this.state.countDown/this.props.duration
    return (
      <div className="CountDown" id="CountDown">
        <span className="restTime">{this.countDown}</span>
        <div className="progress" style={{width: `${perent*100}%`}}></div>
      </div>
    )
  }
}
