import React, { Component } from 'react'
import TomatoAction from './TomatoAction'
const { connect } = require("react-redux");
import './Tomatoes.scss'

class Tomatoes extends Component {
  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction/>
      </div>
    )
  }
}

const mapStateToProps = (state:any,ownProps:any) =>({
  tomatoes: state.tomatoes,
  ...ownProps
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);
