import './style.css'

import { Component } from "react";

export class Button extends Component {
  render() {

    const { text, onClick, disabled } = this.props

    return (
      <button
        className='pagination-button'
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    )
  }
}