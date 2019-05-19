import React, { Component } from 'react'
import TomatoAction from './TomatoAction'
import TomatoList from './TomatoList';
const { connect } = require("react-redux");
import {addTomato,updateTomato,initTomatoes} from '../../redux/actions/tomatos';
import axios from '../../config/axios';
const _ = require("lodash");
import { format } from "date-fns";
import './Tomatoes.scss'


interface ITomatoesProps{
  addTomato: (payload: any) => any;
  updateTomato: (payload: any) => any;
  initTomatoes: (payload: any[]) => any;
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
    console.log(this.props.tomatoes)
    return this.props.tomatoes.filter(t => !t.description && !t.ended_at
    && !t.aborted)[0]
  }

  get finishedTomatoes(){
    const finishedTomatoes = this.props.tomatoes.filter(t => !t.description && !t.ended_at
      && !t.aborted)
    const obj = _.groupBy(finishedTomatoes,(tomato:any)=>{
      return format(tomato.started_at,"YYYY-MM-D")
    })
    return obj
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

  startTomato = async ()=>{
    try{
      const response = await axios.post("tomatoes",{duration: 1500000})
      this.props.addTomato(response.data.resource)
      console.log("startTomato",response.data)
    }catch(e){
      throw new Error(e)
    }
  }

  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction startTomato={this.startTomato} 
          unfinishedTomato={this.unfinishedTomato}
          updateTomato = {this.props.updateTomato}
        />
        <TomatoList finishedTomatoes={this.finishedTomatoes}/>
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
  updateTomato,
  initTomatoes
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);
