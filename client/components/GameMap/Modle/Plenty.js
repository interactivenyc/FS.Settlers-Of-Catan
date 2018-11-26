import React, {Component} from 'react'
import SwappingWindow from './RobberModal/SwappingWindow'

class Plenty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: [
        {type: 'forest', quantity: 2},
        {type: 'field', quantity: 2},
        {type: 'hill', quantity: 2},
        {type: 'mountain', quantity: 2},
        {type: 'pasture', quantity: 2}
      ],
      choice: [
        {type: 'forest', quantity: 0},
        {type: 'field', quantity: 0},
        {type: 'hill', quantity: 0},
        {type: 'mountain', quantity: 0},
        {type: 'pasture', quantity: 0}
      ],
      discard: 2
    }
  }

  swapResources = (type, from, to) => {
    if (from.filter(resource => resource.type === type)[0].quantity > 0) {
      to = to.map(
        resource =>
          resource.type === type
            ? {...resource, quantity: resource.quantity + 1}
            : resource
      )
      from = from.map(
        resource =>
          resource.type === type
            ? {...resource, quantity: resource.quantity - 1}
            : resource
      )
    } else {
      return [[...from], [...to]]
    }
    return [from, to]
  }

  handleClickSubtract = e => {
    let {start, choice} = this.state
    const type = e.target.dataset.resource
    const total = start.reduce((acc, val) => acc + val.quantity, 0)
    console.log(total)
    if (total < this.state.discard) {
      const [from, to] = this.swapResources(type, choice, start)
      this.setState({start: to, choice: from})
    }
  }

  handleClickAdd = e => {
    let {start, choice} = this.state
    const type = e.target.dataset.resource
    const [from, to] = this.swapResources(type, start, choice)
    const total = choice.reduce((acc, val) => acc + val.quantity, 0)
    if (total < this.state.discard) {
      this.setState({start: from, choice: to})
    }
  }

  //   handleClickConfirm = () => {
  //     const {toggleModal, player} = this.props
  //     const {discard, choice} = this.state
  //     const id = player.playerNumber

  // robberDiscardThunk({discard, id, resources: start2})
  //     toggleModal(false)
  //   }
  render() {
    return (
      <div className="robber-modal-container">
        <h1>{`Select  ${this.state.discard} resource cards`}</h1>
        <div className="robber-modal">
          {this.state.start.map((resource, i) => (
            <SwappingWindow
              key={resource.type}
              resource={resource}
              robber={this.state.choice[i]}
              handleClickAdd={this.handleClickAdd}
              handleClickSubtract={this.handleClickSubtract}
            />
          ))}
        </div>
        <button
          type="button"
          disabled={0 !== this.state.discard}
          className={`confirm-btn ${0 === this.state.discard && 'visible'}`}
          onClick={this.handleClickConfirm}
        >
          accept
        </button>
      </div>
    )
  }
}

export default Plenty
