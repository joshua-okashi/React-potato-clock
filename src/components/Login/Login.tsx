import React, { Component } from 'react'
import { Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import './Login.scss'

interface ILoginState {
  account: string,
  password: string,
}

export default class Login extends Component<any,ILoginState> {
  constructor(props: any) {
    super(props)
    this.state = {
      account: '',
      password: ''
    }
  }

  onChange = (key: keyof ILoginState,value:string) => {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }

  submit = async () => {
    const { account, password} = this.state
    try {
      await axios.post('sign_in/user', {
        account,
        password
      })
      this.props.history.push('/')
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    const { account,password } = this.state
    return (
      <div>
        <div className='Login' id='Login'>
          <h1>番茄闹钟</h1>
          <Input
            placeholder="请输入用户名"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={account}
            onChange={(e) =>{this.onChange('account',e.target.value)}}
          />
          <Input.Password 
            value={password} placeholder="请输入密码"
            onChange={(e) =>{this.onChange('password',e.target.value)}} 
          />
          <Button 
            type="primary" className="LoginButton" onClick={this.submit}>登录
          </Button>
          <p>如果没有账号，请<Link to='/SignUp'>注册</Link>></p>
        </div>
      </div>
    )
  }
}
