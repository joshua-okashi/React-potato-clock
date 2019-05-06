import React, { Component } from 'react'
import TomatoAction from './TomatoAction'
const { connect } = require("react-redux");
import {addTomato,initTomatoes} from '../../redux/actions/tomatos';
import axios from '../../config/axios';
import './Tomatoes.scss'

interface ITomatoesProps{
  addTomato: (payload: any) => any;
  tomatoes: any[];
}

class Tomatoes extends Component<ITomatoesProps> {
  constructor(props:any){
    super(props)
    console.log("Tomatoes props:" ,props);
    
  }

  componentDidMount(){
    this.getTomatoes()
  }

  get unfinishedTomato(){
    return this.props.tomatoes.filter(t => !t.description && !t.end_at)[0]
  }

  getTomatoes = async ()=>{
    try{
      const response = await axios.get('tomatoes')
      console.log("getTomatoes:",response.data);
      
    }catch(e){
      throw new Error(e)
    }
  }

  startTomato = async ()=>{
    try{
      const response = await axios.post("tomatoes",{duration: 25*60*1000})
      this.props.addTomato(response.data.resource)
      console.log(response.data);
      
    }catch(e){
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction startTomato={this.startTomato} 
          unfinishedTomato={this.unfinishedTomato}
        />
      </div>
    )
  }
}

const mapStateToProps = (state:any,ownProps:any) =>({
  tomatoes: state.tomatoes,
  ...ownProps
})

const mapDispatchToProps = {
  addTomato,
  initTomatoes
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);
