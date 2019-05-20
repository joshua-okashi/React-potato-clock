import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import Todos from "../Todos/Todos";
import Tomatoes from "../Tomatoes/Tomatoes";
const { connect } = require("react-redux");
import {initTodos} from '../../redux/actions/todos';
import {initTomatoes} from '../../redux/actions/tomatoes';
import Statistics from "../Statistics/Statistics";
import axios from '../../config/axios';
import  history  from "../../config/history";
import './Home.scss';

// interface IRouter {
//   history: any;
// }

interface IHomeState {
  user: any;
}

const logout = () => {
  localStorage.setItem('x-token', '')
  history.push('/login')
}

const menu = (
  <Menu>
    <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
    <Menu.Item key="2" onClick={logout}><Icon type="logout" />登出</Menu.Item>
  </Menu>
);

 class Home extends Component<any, IHomeState> {
  constructor(props: any) {
    super(props)
    this.state = {
      user: {}
    }
  }

  async componentWillMount() {
    await this.getMe()
    await this.getTodos()
    await this.getTomatoes()

  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos')
      const todos = response.data.resources.map((t: any) => Object.assign({}, t, { editing: false }))
      console.log("getTodos:",response.data)
      this.props.initTodos(todos)
    } catch (e) {
      throw new Error(e)
    }
  }

  getTomatoes = async ()=>{
    try{
      const response = await axios.get('tomatoes')
      this.props.initTomatoes(response.data.resources)
      console.log("getTomatoes:",response.data); 
    }catch(e){
      throw new Error(e)
    }
  }

  getMe = async () => {
    const response = await axios.get('me')
    this.setState({ user: response.data })
  }

  render() {
    return (
      <div className='Home' id='Home'>
        <header>
          <span className="logo">Logo</span>
          <Dropdown overlay={menu}>
            <span>{this.state.user.account} 
            <Icon type="down" style={{ marginLeft: 10 }}/>
            </span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes/>
          <Todos/>
        </main>
        <Statistics/>
      </div>
    )
  }
}

const mapStateToProps = (state:any, ownProps:any) =>({
  ...ownProps
})

const mapDispatchToProps = {
  initTodos,
  initTomatoes
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)