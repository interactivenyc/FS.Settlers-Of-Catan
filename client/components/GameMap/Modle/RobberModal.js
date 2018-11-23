import React, {Component} from 'react'
import './RobberModal.css'

class RobberModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.setState({playerResources: this.props.player.resources})
  }

  handleClickAdd(e) {
    console.log(e.target.dataset.resource)
    const updatedRobber = this.state.robber.map(resource)
  }
  handleClickSubtract(e) {
    console.log(e.target.dataset.resource)
  }

  render() {
    const {toggleModal} = this.props
    return (
      <div className="robber-modal-container">
        <h1>You are being robbed</h1>
        <div className="robber-modal">
          {this.state.playerResources.map((resource, i) => (
            <div key={resource.type} className="robber-modal-group">
              <div className="robber-modal-item resource-group">
                <h2 className="subtract-text">
                  {this.state.robber[i].quantity}
                </h2>
                <div
                  key={resource.type}
                  className={`modal-resource ${resource.type}`}
                />
              </div>
              <div className="add-subtract-container robber-modal-item">
                <div
                  className="btn-container add"
                  data-resource={resource.type}
                  onClick={this.handleClickAdd}
                >
                  +
                </div>
                <div
                  className="btn-container subtract"
                  data-resource={resource.type}
                  onClick={this.handleClickSubtract}
                >
                  -
                </div>
              </div>
              <div className="robber-modal-item resource-group">
                <div className={`modal-resource ${resource.type}`} />
                <h2>{resource.quantity}</h2>
              </div>
            </div>
          ))}
        </div>
        <button className="confirm-btn" onClick={() => toggleModal(false)}>
          confirm
        </button>
      </div>
    )
  }
}

export default RobberModal
