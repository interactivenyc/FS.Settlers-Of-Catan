import React from 'react'

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
            />
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button forest"
            />
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button field"
            />
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button pasture"
            />
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button mountain"
            />
          </button>
          <button className="trade-modal-container" type="button">
            My Offer = &nbsp;
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button hill"
            />
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button forest"
            />
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button field"
            />
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button pasture"
            />
            <div
              onClick={this.clickItem}
              className="trade-resource trade-modal-button mountain"
            />
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

export default TradeModal
