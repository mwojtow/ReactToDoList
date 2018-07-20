import React, { Component } from 'react'

export default class Note extends Component {
  render() {
    return (
      <div className="note" >
        { this.props.text }
        <button onClick={this.props.deleteMethod}>usun</button>
      </div>
    )
  }
}
