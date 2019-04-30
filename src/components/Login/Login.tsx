import React, { Component } from 'react'
import { Button } from "antd";

export default class Login extends Component {
  
  login = () =>{

  }

   render() {
    return (
      <div>
        <Button onClick={this.login}>登录</Button>  
      </div>
    )
  }
}
