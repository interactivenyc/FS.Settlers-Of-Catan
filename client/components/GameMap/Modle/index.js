import React from 'react'
import BuildModal from './BuildModal'
import DevCardModal from './DevCardModal'
import RobberModal from './RobberModal'
import TradeModal from './TradeModal'
import OfferModal from './OfferModal'
import Plenty from './Plenty'

const Modle = ({
  visible,
  toggleModal,
  buyaCard,
  adjustScore,
  playerHand,
  handlePlayCard,
  player,
  plentyThunk,
  changeGamePhase,
  robberDiscardThunk
}) => {
  const setUpModal = modalType => {
    switch (modalType) {
      case 'build':
        return (
          <BuildModal
            toggleModal={toggleModal}
            player={player}
            changeGamePhase={changeGamePhase}
          />
        )
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
        return (
          <RobberModal
            player={player}
            toggleModal={toggleModal}
            robberDiscardThunk={robberDiscardThunk}
          />
        )
      case 'trade':
        return <TradeModal toggleModal={toggleModal} />
      case 'offer':
        return <OfferModal toggleModal={toggleModal} />
      case 'plenty':
        return (
          <Plenty
            plentyThunk={plentyThunk}
            player={player}
            toggleModal={toggleModal}
          />
        )
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
