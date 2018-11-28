import React, {Component} from 'react'

class Monopoly extends Component {
  handleClick = event => {
    console.log('click handler', event)
    if (event.target.classList.contains('modal-resource')) {
      this.props.monopoly(event.target.dataset.resource)
      this.props.toggleModal(false)
    }
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h1> Choose A Resource </h1>
        <div
          style={{display: 'flex', justifyContent: 'space-evenly'}}
          onClick={this.handleClick}
        >
          <div
            data-resource="forest"
            className="modal-resource trade-modal-button forest"
          />
          <div
            data-resource="field"
            className="modal-resource trade-modal-button field"
          />
          <div
            data-resource="hill"
            className="modal-resource trade-modal-button hill "
          />
          <div
            data-resource="mountain"
            className="modal-resource trade-modal-button mountain"
          />
          <div
            data-resource="pasture"
            className="modal-resource trade-modal-button pasture"
          />
        </div>
      </div>
    )
  }
}

export default Monopoly
