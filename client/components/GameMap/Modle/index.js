import React from 'react'
import BuildModal from './BuildModal'
import DevCardModal from './DevCardModal'
import RobberModal from './RobberModal'

const Modle = ({visible, toggleModal, player, robberDiscardThunk}) => {
  const setUpModal = modalType => {
    switch (modalType) {
      case 'build':
        return <BuildModal toggleModal={toggleModal} />
      case 'showDevCards':
        return <DevCardModal toggleModal={toggleModal} />
      case 'robber':
        return (
          <RobberModal
            player={player}
            toggleModal={toggleModal}
            robberDiscardThunk={robberDiscardThunk}
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
