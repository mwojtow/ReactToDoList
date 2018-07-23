import React, { Component } from 'react'

export default class Note extends Component {
  render() {
    return (
      <div className="note" >
        <div className="pin"></div>
        { this.props.text }
        <button className="btn-delete" onClick={this.props.deleteMethod}>X</button>
      </div>
    )
  }
}
