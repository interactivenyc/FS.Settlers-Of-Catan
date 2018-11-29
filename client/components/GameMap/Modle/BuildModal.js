import React from 'react'

class BuildModal extends React.Component {
  constructor() {
    super()
    this.state = {
      road: {hill: 1, forest: 1, toggle: 'inactive'},
      settlement: {
        hill: 1,
        forest: 1,
        field: 1,
        pasture: 1,
        toggle: 'inactive'
      },
      city: {field: 2, mountain: 3, toggle: 'inactive'}
    }
  }

  componentDidMount() {
    const {player} = this.props
    const buildKey = {...this.state}

    for (const construct in buildKey) {
      let hasResources = true
      for (const resource in buildKey[construct]) {
        player.resources.forEach(res => {
          if (
            res.type === resource &&
            !(res.quantity >= buildKey[construct][resource])
          ) {
            hasResources = false
          }
        })
      }
      if (!hasResources)
        this.setState({
          [construct]: {...this.state[construct], toggle: 'inactive'}
        })
      else
        this.setState({
          [construct]: {...this.state[construct], toggle: 'active'}
        })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const {player} = this.props
      const buildKey = {...this.state}

      for (const construct in buildKey) {
        let hasResources = true
        for (const resource in buildKey[construct]) {
          player.resources.forEach(res => {
            if (
              res.type === resource &&
              !(res.quantity >= buildKey[construct][resource])
            ) {
              hasResources = false
            }
          })
        }
        if (!hasResources)
          this.setState({
            [construct]: {...this.state[construct], toggle: 'inactive'}
          })
        else
          this.setState({
            [construct]: {...this.state[construct], toggle: 'active'}
          })
      }
    }
  }

  handleClick = event => {
    const {changeGamePhase, toggleModal} = this.props

    if (!event.target.disabled && !event.target.parentElement.disabled) {
      switch (event.target.id || event.target.parentElement.id) {
        case 'road': {
          changeGamePhase('build road')
          return toggleModal(false)
        }
        case 'settlement': {
          changeGamePhase('build settlement')
          return toggleModal(false)
        }
        case 'city': {
          changeGamePhase('build city')
          return toggleModal(false)
        }
      }
    }
  }

  render() {
    const {toggleModal} = this.props

    return (
      <div onClick={event => this.handleClick(event)}>
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
          <button
            id="road"
            className={`build-modal-button build-modal-button-${
              this.state.road.toggle
            }`}
            disabled={this.state.road.toggle === 'inactive'}
          >
            Road = &nbsp;<div className="modal-resource hill" />
            <div className="modal-resource forest" />
          </button>
          <button
            id="settlement"
            className={`build-modal-button build-modal-button-${
              this.state.settlement.toggle
            }`}
            disabled={this.state.settlement.toggle === 'inactive'}
          >
            Settlement = &nbsp;<div className="modal-resource hill" />
            <div className="modal-resource forest" />
            <div className="modal-resource field" />
            <div className="modal-resource pasture" />
          </button>
          <button
            id="city"
            className={`build-modal-button build-modal-button-${
              this.state.city.toggle
            }`}
            disabled={this.state.city.toggle === 'inactive'}
          >
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
}

export default BuildModal
