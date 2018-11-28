import React from 'react'
const DevCardModal = ({
  toggleModal,
  buyaCard,
  adjustScore,
  playerHand,
  handlePlayCard,
  player
}) => {
  let btnActive = player.resources.filter(resource => {
    return (
      resource.type === 'pasture' ||
      resource.type === 'field' ||
      resource.type === 'mountain'
    )
  })

  console.log(btnActive)
  btnActive = btnActive.every(resource => resource.quantity > 0)

  console.log(btnActive)
  return (
    <div>
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
              handlePlayCard(el)
            }}
            key={i}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="build-modal">
        <div />

        <button
          disabled={!btnActive}
          onClick={buyaCard}
          className={`build-modal-button ${btnActive &&
            'build-modal-button-active'}`}
        >
          Get New Development Card = &nbsp;<div className="modal-resource pasture" />
          <div className="modal-resource field" />
          <div className="modal-resource mountain" />
        </button>
      </div>
    </div>
  )
}

export default DevCardModal
