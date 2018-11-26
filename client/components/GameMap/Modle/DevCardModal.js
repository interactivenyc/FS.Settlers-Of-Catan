import React from 'react'
const DevCardModal = ({
  toggleModal,
  buyaCard,
  adjustScore,
  playerHand,
  handlePlayCard
}) => {
  return (
    <div className="game-modle game-modle-active">
      <div style={{fontSize: '20pt', margin: '10px', flexGrow: 1}}>
        Development Cards
        <button
          onClick={() => toggleModal(false)}
          style={{float: 'right', fontSize: '10pt'}}
        />
      </div>
      <div>
        {playerHand.map((el, i) => (
          <button
            onClick={() => {
              handlePlayCard('monopoly')
            }}
            key={i}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="build-modal">
        <div />

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
