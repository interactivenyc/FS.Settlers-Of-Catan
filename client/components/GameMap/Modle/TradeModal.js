import React from 'react'
import {connect} from 'react-redux'
import TradeCount from './TradeCount'

class TradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.props.toggleModal

    this.state = {
      offerCards: [],
      wantCards: []
    }

    this.clickItem = this.clickItem.bind(this)
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
    this.getResourceCount = this.getResourceCount.bind(this)
    this.getOfferCount = this.getOfferCount.bind(this)
  }

  clickItem(e) {
    console.log('[ TradeModal ] clickItem', e.target)
    e.target.classList.toggle('trade-modal-button-active')
    e.target.classList.toggle('trade-modal-button')
  }
  reset(e) {
    console.log('[ TradeModal ] reset', e.target)
  }
  submit(e) {
    console.log('[ TradeModal ] submit trade', e.target)
  }
  getResourceCount(type) {
    let found = this.props.resources.find(element => {
      return element.type === type
    })
    console.log('[ TradeModal ] getResourceCount', found)
    if (found) {
      return found.quantity - this.getOfferCount(type)
    } else {
      return 0
    }
  }
  getOfferCount(type) {
    let found = this.state.offerCards.find(element => {
      return element.type === type
    })
    console.log('[ TradeModal ] getOfferCount', type, found)
    if (found) {
      return found.quantity
    } else {
      console.log('[ TradeModal ] getOfferCount return 0')
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
              onClick={this.clickItem}
              className="trade-resource trade-modal-button hill "
            >
              0
            </div>
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button forest"
            >
              0
            </div>
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button field"
            >
              0
            </div>
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button pasture"
            >
              0
            </div>
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button mountain"
            >
              0
            </div>
          </button>
          <button className="trade-modal-container" type="button">
            My Offer = &nbsp;
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button hill"
            >
              <TradeCount
                type="hill"
                resourceCount={this.getResourceCount('hill')}
                offerCount={this.getOfferCount('hill')}
              />
            </div>
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button forest"
            >
              <TradeCount
                type="forest"
                resourceCount={this.getResourceCount('forest')}
                offerCount={this.getOfferCount('forest')}
              />
            </div>
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button field"
            >
              <TradeCount
                type="field"
                resourceCount={this.getResourceCount('field')}
                offerCount={this.getOfferCount('field')}
              />
            </div>
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button pasture"
            >
              <TradeCount
                type="pasture"
                resourceCount={this.getResourceCount('pasture')}
                offerCount={this.getOfferCount('pasture')}
              />
            </div>
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button mountain"
            >
              <TradeCount
                type="mountain"
                resourceCount={this.getResourceCount('mountain')}
                offerCount={this.getOfferCount('mountain')}
              />
            </div>
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
    resources: state.playerState.resources
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(TradeModal)
