import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions'

class OfferModal extends React.Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.props.toggleModal

    this.getResourceCount = this.getResourceCount.bind(this)
    this.getOfferCount = this.getOfferCount.bind(this)
    this.getWantCount = this.getWantCount.bind(this)
    this.accept = this.accept.bind(this)
    this.reject = this.reject.bind(this)
  }

  accept(e) {
    console.log('[ OfferModal ] accept', this.props.playerState.playerNumber)
    this.props.acceptOffer(this.props.playerState.playerNumber)
    this.toggleModal(false)
  }
  reject(e) {
    console.log('[ OfferModal ] reject', this.props.playerState.playerNumber)
    this.props.rejectOffer(this.props.playerState.playerNumber)
    this.toggleModal(false)
  }
  getResourceCount(type) {
    let found = this.props.resources.find(element => {
      return element.type === type
    })
    if (found) {
      return found.quantity
    } else {
      return 0
    }
  }
  getOfferCount(type) {
    let found = this.state.offerCards.find(element => {
      return element.type === type
    })
    if (found) {
      return found.quantity
    } else {
      return 0
    }
  }

  getWantCount(type) {
    let found = this.state.wantCards.find(element => {
      return element.type === type
    })
    if (found) {
      return found.quantity
    } else {
      return 0
    }
  }

  render() {
    return (
      <div className="game-modle game-modle-active">
        <div style={{fontSize: '20pt', margin: '10px', flexGrow: 1}}>
          Trade
          <button
            onClick={() => this.toggleModal(false)}
            style={{float: 'right', fontSize: '10pt'}}
            type="button"
          >
            X
          </button>
        </div>
        <div className="trade-modal">
          <button className="trade-modal-container" type="button">
            I Want = &nbsp;
          </button>

          <button className="trade-modal-container" type="button">
            My Offer = &nbsp;
          </button>
          <button
            onClick={this.accept}
            className="build-modal-button"
            type="button"
          >
            Accept
          </button>
          <button
            onClick={this.reject}
            className="build-modal-button"
            type="button"
          >
            Reject
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapState', state.playerState.resources)

  return {
    resources: state.playerState.resources,
    currentTrade: state.gameState.currentTrade,
    playerState: state.playerState
  }
}

const mapDispatch = dispatch => {
  return {
    acceptOffer: currentTrade => dispatch(actions.acceptOffer(currentTrade)),
    rejectOffer: currentTrade => dispatch(actions.rejectOffer(currentTrade))
  }
}

export default connect(mapState, mapDispatch)(OfferModal)
