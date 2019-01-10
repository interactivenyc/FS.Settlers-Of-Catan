import React from 'react'
import {connect} from 'react-redux'
import TradeCount from './TradeCount'
import * as actions from '../../../store/actions'

class TradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.props.toggleModal

    this.state = {
      offerCards: [],
      wantCards: []
    }

    this.clickOffer = this.clickOffer.bind(this)
    this.clickWant = this.clickWant.bind(this)
    this.getResourceCount = this.getResourceCount.bind(this)
    this.getOfferCount = this.getOfferCount.bind(this)
    this.getWantCount = this.getWantCount.bind(this)
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
    this.getDisabled = this.getDisabled.bind(this)
  }

  clickOffer(e) {
    // console.log('[ TradeModal ] clickOffer', e.currentTarget.id)
    const type = e.currentTarget.id
    let found = this.state.offerCards.find(element => {
      return element.type === type
    })
    if (found) {
      if (this.getResourceCount(type) - this.getOfferCount(type) > 0) {
        found.quantity++
        this.setState({
          offerCards: this.state.offerCards
        })
      } else {
        console.log("You don't have enough resources")
      }
    } else {
      this.setState({
        offerCards: [...this.state.offerCards, {type: type, quantity: 1}]
      })
    }
  }
  clickWant(e) {
    // console.log('[ TradeModal ] clickWant', e.currentTarget.id)
    const type = e.currentTarget.id
    let found = this.state.wantCards.find(element => {
      return element.type === type
    })
    if (found) {
      found.quantity++
      this.setState({
        wantCards: this.state.wantCards
      })
    } else {
      this.setState({
        wantCards: [...this.state.wantCards, {type: type, quantity: 1}]
      })
    }
  }
  reset(e) {
    // console.log('[ TradeModal ] reset state', e.target)
    this.setState({
      offerCards: [],
      wantCards: []
    })
  }
  submit(e) {
    console.log('[ TradeModal ] submit trade', e.target)
    const currentTrade = {
      offerCards: this.state.offerCards,
      wantCards: this.state.wantCards,
      playerNumber: this.props.playerState.playerNumber,
      accepted: false,
      rejected: 0
    }
    this.props.makeOffer(currentTrade)
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

  getDisabled() {
    // console.log('[ TradeModal ] getDisabled', this.props.currentTrade)
    if (this.props.currentTrade) {
      return true
    } else {
      return false
    }
  }

  getRejectCount() {
    if (this.props.currentTrade && this.props.currentTrade.rejected) {
      return this.props.currentTrade.rejected
    } else {
      return 0
    }
  }

  /* eslint-disable no-alert */
  componentDidUpdate() {
    console.log('[ TradeModal ] componentDidUpdate')

    if (this.props.currentTrade) {
      console.log(
        '[ TradeModal ] trade result accepted/rejected',
        this.props.currentTrade.accepted,
        this.props.currentTrade.rejected
      )
      if (this.props.currentTrade.accepted) {
        console.log('[ TradeModal ] final result ACCEPTED')
        window.alert('your offer was accepted')
        this.props.clearOffer()
        this.props.toggleModal(false)
      } else if (
        this.props.currentTrade.rejected ===
        this.props.numPlayers - 1
      ) {
        console.log('[ TradeModal ] final result REJECTED')
        window.alert('your offer was rejected')
        this.props.clearOffer()
        this.props.toggleModal(false)
      }
    }
  }

  render() {
    return (
      <div>
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
            <div
              id="hill"
              onClick={this.clickWant}
              className="trade-resource trade-modal-button hill "
            >
              <TradeCount
                resourceCount={this.getWantCount('hill')}
                offerCount=""
              />
            </div>
            <div
              id="forest"
              onClick={this.clickWant}
              className="trade-resource trade-modal-button forest"
            >
              <TradeCount
                resourceCount={this.getWantCount('forest')}
                offerCount=""
              />
            </div>
            <div
              id="field"
              onClick={this.clickWant}
              className="trade-resource trade-modal-button field"
            >
              <TradeCount
                resourceCount={this.getWantCount('field')}
                offerCount=""
              />
            </div>
            <div
              id="pasture"
              onClick={this.clickWant}
              className="trade-resource trade-modal-button pasture"
            >
              <TradeCount
                resourceCount={this.getWantCount('pasture')}
                offerCount=""
              />
            </div>
            <div
              id="mountain"
              onClick={this.clickWant}
              className="trade-resource trade-modal-button mountain"
            >
              <TradeCount
                resourceCount={this.getWantCount('mountain')}
                offerCount=""
              />
            </div>
          </button>

          <button className="trade-modal-container" type="button">
            My Offer = &nbsp;
            {this.getResourceCount('hill') > 0 ? (
              <div
                id="hill"
                onClick={this.clickOffer}
                className="trade-resource trade-modal-button hill"
              >
                <TradeCount
                  resourceCount={
                    this.getResourceCount('hill') - this.getOfferCount('hill')
                  }
                  offerCount={this.getOfferCount('hill')}
                />
              </div>
            ) : (
              <div />
            )}
            {this.getResourceCount('forest') > 0 ? (
              <div
                id="forest"
                onClick={this.clickOffer}
                className="trade-resource trade-modal-button forest"
              >
                <TradeCount
                  resourceCount={
                    this.getResourceCount('forest') -
                    this.getOfferCount('forest')
                  }
                  offerCount={this.getOfferCount('forest')}
                />
              </div>
            ) : (
              <div />
            )}
            {this.getResourceCount('field') > 0 ? (
              <div
                id="field"
                onClick={this.clickOffer}
                className="trade-resource trade-modal-button field"
              >
                <TradeCount
                  resourceCount={
                    this.getResourceCount('field') - this.getOfferCount('field')
                  }
                  offerCount={this.getOfferCount('field')}
                />
              </div>
            ) : (
              <div />
            )}
            {this.getResourceCount('pasture') > 0 ? (
              <div
                id="pasture"
                onClick={this.clickOffer}
                className="trade-resource trade-modal-button pasture"
              >
                <TradeCount
                  resourceCount={
                    this.getResourceCount('pasture') -
                    this.getOfferCount('pasture')
                  }
                  offerCount={this.getOfferCount('pasture')}
                />
              </div>
            ) : (
              <div />
            )}
            {this.getResourceCount('mountain') > 0 ? (
              <div
                id="mountain"
                onClick={this.clickOffer}
                className="trade-resource trade-modal-button mountain"
              >
                <TradeCount
                  resourceCount={
                    this.getResourceCount('mountain') -
                    this.getOfferCount('mountain')
                  }
                  offerCount={this.getOfferCount('mountain')}
                />
              </div>
            ) : (
              <div />
            )}
          </button>

          {this.getDisabled() ? (
            <button
              onClick={this.submit}
              disabled={this.getDisabled()}
              className="build-modal-button"
              type="button"
            >
              Rejected: {this.getRejectCount()}
            </button>
          ) : (
            <React.Fragment>
              <button
                onClick={this.reset}
                disabled={this.getDisabled()}
                className="build-modal-button"
                type="button"
              >
                Reset
              </button>
              <button
                onClick={this.submit}
                disabled={this.getDisabled()}
                className="build-modal-button"
                type="button"
              >
                Submit
              </button>
            </React.Fragment>
          )}
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
    playerState: state.playerState,
    numPlayers: state.gameState.players.length
  }
}

const mapDispatch = dispatch => {
  return {
    makeOffer: currentTrade => dispatch(actions.makeOffer(currentTrade)),
    clearOffer: () => dispatch(actions.clearOffer())
  }
}

export default connect(mapState, mapDispatch)(TradeModal)
