import React from 'react'

const DevCardModal = ({toggleModal}) => {
  return (
    <div>
      <div style={{fontSize: '20pt', margin: '10px', flexGrow: 1}}>
        Devlopment Cards
        <button
          onClick={() => toggleModal(false)}
          style={{float: 'right', fontSize: '10pt'}}
        >
          X
        </button>
      </div>
      <div className="build-modal">
        <button className="build-modal-button">
          Get New Development Card = &nbsp;<div className="modal-resource pasture" />
          <div className="modal-resource field" />
          <div className="modal-resource mountain" />
        </button>
      </div>
    </div>
  )
}

export default DevCardModal
