import React from 'react'
const DevCardModal = ({toggleModal, buyaCard, adjustScore}) => {
  return (
    <div className="game-modle game-modle-active">
      <div style={{fontSize: '20pt', margin: '10px', flexGrow: 1}}>
        Development Cards
        <button
          onClick={() => toggleModal(false)}
          style={{float: 'right', fontSize: '10pt'}}
        />
      </div>
      <div className="build-modal">
        <div />
        <button
          className="build-modal-button"
          onClick={() => {
            adjustScore(1)
          }}
        >
          PlayVPCard
        </button>

        <button onClick={buyaCard} className="build-modal-button">
          Get New Development Card = &nbsp;<div className="modal-resource pasture" />
          <div className="modal-resource field" />
          <div className="modal-resource mountain" />
        </button>
      </div>
    </div>
  )
}

export default DevCardModal
