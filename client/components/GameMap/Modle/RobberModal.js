import React, {Component} from 'react'

class RobberModal extends Component {
  render() {
    const {resources} = player
    console.log(resources)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h1>This is the robber modal</h1>
        <button onClick={() => toggleModal(false)}>Close</button>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          {resources.map(resource => (
            <div>{`${resource.type}, ${resource.quantity}`}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default RobberModal
