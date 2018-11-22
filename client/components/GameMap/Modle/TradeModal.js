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
  }

  clickOffer(e) {
    console.log('[ TradeModal ] clickOffer', e.currentTarget.id)
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
    console.log('[ TradeModal ] clickWant', e.currentTarget.id)
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
    console.log('[ TradeModal ] reset state', e.target)
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
      playerNumber: this.props.playerState.playerNumber
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
          <button
            onClick={this.reset}
            className="build-modal-button"
            type="button"
          >
            Reset
          </button>
          <button
            onClick={this.submit}
            className="build-modal-button"
            type="button"
          >
            Submit
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
    makeOffer: currentTrade => dispatch(actions.makeOffer(currentTrade))
  }
}

export default connect(mapState, mapDispatch)(TradeModal)
