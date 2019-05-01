import React, { Component } from 'react'
import { Input, Icon ,Button } from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './SignUp.scss'

interface ISignUpState {
  account: string,
  password: string,
  passwordConformation: string
}

export default class SignUp extends Component<any,ISignUpState> {
  constructor(props:any) {
    super(props)
    this.state = {
      account: '',
      password: '',
      passwordConformation: ''
    }
  }
  onChange = (key: keyof ISignUpState,value:string) => {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }

  submit = async () =>{
    const { account,password,passwordConformation } = this.state
    try{
      await axios.post('sign_up/user',{
        account,
        password,
        password_confirmation: passwordConformation
      })
      this.props.history.push('/')
    }catch(e){
      throw new Error(e)
    }
  }

  render() {
    const { account,password,passwordConformation } = this.state
    return (
      <div className='SignUp' id='SignUp'>
        <h1>番茄闹钟</h1>
        <Input
          placeholder="请输入用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={ account }
          onChange={(e) =>{this.onChange('account',e.target.value)}}
        />
        <Input.Password 
        value={password} placeholder="请输入密码" 
        onChange={(e) =>{this.onChange('password',e.target.value)}} 
        />
        <Input.Password 
        value={passwordConformation} placeholder="请确认密码" 
        onChange={(e) =>{this.onChange('passwordConformation',e.target.value)}} 
        />
        <Button 
        type="primary" className="SignUpButton" 
        onClick={this.submit}>注册
        </Button>
        <p>如果有账号，请<Link to='/Login'>登录</Link>></p>
      </div>
    )
  }
}
