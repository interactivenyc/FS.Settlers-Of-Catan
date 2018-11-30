import React, {Component} from 'react'

class VictoryModal extends Component {
  componentDidMount() {
    this.props.victory('victory')
  }
  render() {
    return (
      <div
        className="winner"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '10px',
          letterSpacing: '2px'
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            fontFamily: '"Fantasy", "Luminari", "fantasy"',
            fontSize: '40px',
            marginTop: '20px'
          }}
        >
          GAME OVER
        </h1>
        <h2 style={{textAlign: 'center'}}>{`player-${
          this.props.player.playerNumber
        } has achieved victory with 10 victory points!`}</h2>
      </div>
    )
  }
}

export default VictoryModal
