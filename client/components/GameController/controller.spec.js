import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import GameController from './index'
import Dice from '../Dice'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('GameController', () => {
  let gameController
  let dice

  beforeEach(() => {
    gameController = shallow(<GameController />)
    dice = shallow(<Dice />)
  })

  it('has has die1 on state', () => {
    console.log(gameController)
    expect(gameController.state).to.have.property('die1')
  })

  it('displays dice', () => {
    expect(dice.props).to.have.property('die1')
  })
})
