import React,{useState,useEffect,FunctionComponent} from 'react';


interface ICountDownHookProps {
  timer: number;
  onFinish: () => void;
}

let timerId:NodeJS.Timeout | null = null

  const CountDownHook:FunctionComponent<ICountDownHookProps>= (props)=>{
  const [countDown, setCountDown] = useState(props.timer)

  const min = Math.floor(countDown/1000/60)
  const second = Math.floor(countDown/1000%60)
  const time = `${min}:${second<10?`0${second}`:second}`
  
  useEffect(() => {
    timerId = setInterval(()=>{
      setCountDown(countDown-1000)  
      if( countDown < 0){
        props.onFinish()
        clearInterval(Number(timerId))
      }
    },1000)
    return function cleanup() {
      clearInterval(Number(timerId))
    }
  })

  return (
    <div className="CountDown">
      {time}
    </div>
  )
}

export default CountDownHook