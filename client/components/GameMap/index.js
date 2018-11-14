import React, {Component} from 'react'
import MapRow from './MapRow'
import Hexagon from './Hexagon.js'
import './GameMap.css'

class GameMap extends Component {
  render() {
    return (
      <div className="board">
        <MapRow style={{transform: 'translateY(60%)'}}>
          <Hexagon />
          <Hexagon style={{transform: 'translateX(-5%)'}} cityAdjust={-20} />
          <Hexagon
            style={{transform: 'translateX(-10%)'}}
            cityAdjust={-40}
            anchor
          />
        </MapRow>
        <MapRow style={{transform: 'translateY(30%)'}}>
          <Hexagon />
          <Hexagon style={{transform: 'translateX(-5%)'}} cityAdjust={-20} />
          <Hexagon style={{transform: 'translateX(-10%)'}} cityAdjust={-40} />
          <Hexagon
            style={{transform: 'translateX(-15%)'}}
            cityAdjust={-60}
            anchor
          />
        </MapRow>
        <MapRow>
          <Hexagon bottomLeftAnchor />
          <Hexagon style={{transform: 'translateX(-5%)'}} cityAdjust={-20} />
          <Hexagon style={{transform: 'translateX(-10%)'}} cityAdjust={-40} />
          <Hexagon style={{transform: 'translateX(-15%)'}} cityAdjust={-60} />
          <Hexagon
            style={{transform: 'translateX(-20%)'}}
            cityAdjust={-80}
            anchor
            bottomRightAnchor
          />
        </MapRow>
        <MapRow style={{transform: 'translateY(-30%)'}}>
          <Hexagon bottomLeftAnchor />
          <Hexagon style={{transform: 'translateX(-5%)'}} cityAdjust={-20} />
          <Hexagon style={{transform: 'translateX(-10%)'}} cityAdjust={-40} />
          <Hexagon
            style={{transform: 'translateX(-15%)'}}
            cityAdjust={-60}
            anchor
            bottomRightAnchor
          />
        </MapRow>
        <MapRow style={{transform: 'translateY(-60%)'}}>
          <Hexagon bottomLeftAnchor bottomAnchor bottomRightAnchor />
          <Hexagon
            style={{transform: 'translateX(-5%)'}}
            cityAdjust={-20}
            bottomRightAnchor
            bottomAnchor
          />
          <Hexagon
            style={{transform: 'translateX(-10%)'}}
            cityAdjust={-40}
            anchor
            bottomRightAnchor
            bottomAnchor
          />
        </MapRow>
      </div>
    )
  }
}

export default GameMap
