import React from 'react'

const RobberModal = ({toggleModal}) => {
  console.log(toggleModal)
  return (
    <div>
      <h1>This is the robber modal</h1>
      <button onClick={() => toggleModal(false)}>Close</button>
    </div>
  )
}

export default RobberModal
