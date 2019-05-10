import React, { Component } from 'react'

interface ICountDownProps {
  timer: number;
}

interface ICountDownState {
  countDown: number;
}

export default class CountDown extends Component<ICountDownProps,ICountDownState> {
  constructor(props:any){
    super(props)
    this.state = {
      countDown: this.props.timer
    }
  }

  componentDidMount(){
    setInterval(()=>{
      let time = this.state.countDown
      this.setState({countDown: time - 1000})
      if( time < 0){

      }
    },1000)
  }

  render() {
    const min = Math.floor(this.state.countDown/(1000*60))
    const second = Math.floor(this.state.countDown%(1000*60))
    const time = `${min}:${second<10?`0${second}`:second}`

    return (
      <div className="CountDown">
        {time}
      </div>
    )
  }
}
