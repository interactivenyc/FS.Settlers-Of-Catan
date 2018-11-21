import React from 'react'

const BuildModal = ({toggleModal}) => {
  return (
    <div>
      <div style={{fontSize: '20pt', margin: '10px', flexGrow: 1}}>
        Build
        <button
          onClick={() => toggleModal(false)}
          style={{float: 'right', fontSize: '10pt'}}
        >
          X
        </button>
      </div>
      <div className="build-modal">
        <button className="build-modal-button">
          Road = &nbsp;<div className="modal-resource hill" />
          <div className="modal-resource forest" />
        </button>
        <button className="build-modal-button">
          Settlement = &nbsp;<div className="modal-resource hill" />
          <div className="modal-resource forest" />
          <div className="modal-resource field" />
          <div className="modal-resource pasture" />
        </button>
        <button className="build-modal-button">
          City = &nbsp;<div className="modal-resource field" />
          <div className="modal-resource field" />
          <div className="modal-resource mountain" />
          <div className="modal-resource mountain" />
          <div className="modal-resource mountain" />
        </button>
      </div>
    </div>
  )
}

export default BuildModal
