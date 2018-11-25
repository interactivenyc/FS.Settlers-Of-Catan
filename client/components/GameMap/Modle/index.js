import React from 'react'
import BuildModal from './BuildModal'
import DevCardModal from './DevCardModal'
import RobberModal from './RobberModal'
import TradeModal from './TradeModal'
import OfferModal from './OfferModal'

const Modle = ({
  visible,
  toggleModal,
  buyaCard,
  adjustScore,
  playerHand,
  handlePlayCard
}) => {
  const setUpModal = modalType => {
    switch (modalType) {
      case 'build':
        return <BuildModal toggleModal={toggleModal} />
      case 'showDevCards':
        return (
          <DevCardModal
            handlePlayCard={handlePlayCard}
            buyaCard={buyaCard}
            adjustScore={adjustScore}
            playerHand={playerHand}
            toggleModal={toggleModal}
          />
        )
      case 'robber':
        return <RobberModal toggleModal={toggleModal} />
      case 'trade':
        return <TradeModal toggleModal={toggleModal} />
      case 'offer':
        return <OfferModal toggleModal={toggleModal} />
      default:
        return <div />
    }
  }

  return (
    <div className={`game-modle ${visible && 'game-modle-active'}`}>
      {setUpModal(visible)}
    </div>
  )
}

export default Modle
