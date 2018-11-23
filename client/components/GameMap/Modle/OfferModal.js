import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions'

class OfferModal extends React.Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.props.toggleModal

    this.getResourceCount = this.getResourceCount.bind(this)
    this.getWantCount = this.getWantCount.bind(this)
    this.isAcceptable = this.isAcceptable.bind(this)
    this.accept = this.accept.bind(this)
    this.reject = this.reject.bind(this)
  }

  isAcceptable() {
    const wantCards = this.props.playerState.currentTrade.wantCards

    console.log('[ OfferModal ] isAcceptable trader wants', wantCards)
    console.log('[ OfferModal ] isAcceptable player has', this.props.resources)

    for (let i = 0; i < wantCards.length; i++) {
      if (
        this.getResourceCount(wantCards[i].type) >=
        this.getWantCount(wantCards[i].type)
      ) {
        console.log('[ OfferModal ] isAcceptable YES', wantCards[i].type)
      } else {
        console.log('[ OfferModal ] isAcceptable NO', wantCards[i].type)
        return false
      }
    }

    return true
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

  getWantCount(type) {
    let found = this.props.playerState.currentTrade.wantCards.find(element => {
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
            disabled={!this.isAcceptable()}
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
    currentTrade: state.playerState.currentTrade,
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
