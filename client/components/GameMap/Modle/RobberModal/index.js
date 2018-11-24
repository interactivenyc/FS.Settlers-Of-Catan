import React, {Component} from 'react'
import SwappingWindow from './SwappingWindow'
import './RobberModal.css'

class RobberModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discard: 0,
      robber: [
        {type: 'forest', quantity: 0},
        {type: 'field', quantity: 0},
        {type: 'hill', quantity: 0},
        {type: 'mountain', quantity: 0},
        {type: 'pasture', quantity: 0}
      ],
      playerResources: []
    }
  }

  componentDidMount() {
    const {resources} = this.props.player
    const totalCards = resources.reduce(
      (acc, val) => acc + Number(val.quantity),
      0
    )
    this.setState({
      playerResources: resources,
      discard: Math.floor(totalCards / 2)
    })
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
    let {robber, playerResources} = this.state
    const type = e.target.dataset.resource
    const total = robber.reduce((acc, val) => acc + val.quantity, 0)

    if (total < this.state.discard) {
      const [from, to] = this.swapResources(type, playerResources, robber)
      this.setState({robber: to, playerResources: from})
    }
  }

  handleClickAdd = e => {
    let {robber, playerResources} = this.state
    const type = e.target.dataset.resource
    const [from, to] = this.swapResources(type, robber, playerResources)

    this.setState({robber: from, playerResources: to})
  }

  render() {
    const {toggleModal, player, robberDiscardThunk} = this.props
    const {robber, discard, playerResources} = this.state
    const total = robber.reduce((acc, val) => acc + val.quantity, 0)

    return (
      <div className="robber-modal-container">
        <h1>{`You are being robbed you must discard ${discard} cards`}</h1>
        <div className="robber-modal">
          {playerResources.map((resource, i) => (
            <SwappingWindow
              key={resource.type}
              resource={resource}
              robber={robber[i]}
              handleClickAdd={this.handleClickAdd}
              handleClickSubtract={this.handleClickSubtract}
            />
          ))}
        </div>
        <button
          type="button"
          disabled={total !== discard}
          className={`confirm-btn ${total === discard && 'visible'}`}
          onClick={() => {
            robberDiscardThunk({
              discard,
              id: player.playerNumber,
              resources: this.state.playerResources
            })
            toggleModal(false)
          }}
        >
          discard
        </button>
      </div>
    )
  }
}

export default RobberModal
