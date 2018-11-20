const initializedBoard = {
  resources: {
    '11': {id: '1,1', row: 1, column: 1, type: 'forest', diceTarget: 11},
    '12': {id: '1,2', row: 1, column: 2, type: 'pasture', diceTarget: 12},
    '13': {id: '1,3', row: 1, column: 3, type: 'field', diceTarget: 9},
    '21': {id: '2,1', row: 2, column: 1, type: 'hill', diceTarget: 4},
    '22': {id: '2,2', row: 2, column: 2, type: 'mountain', diceTarget: 6},
    '23': {id: '2,3', row: 2, column: 3, type: 'hill', diceTarget: 5},
    '24': {id: '2,4', row: 2, column: 4, type: 'pasture', diceTarget: 10},
    '31': {id: '3,1', row: 3, column: 1, type: 'desert', diceTarget: 0},
    '32': {id: '3,2', row: 3, column: 2, type: 'forest', diceTarget: 3},
    '33': {id: '3,3', row: 3, column: 3, type: 'field', diceTarget: 11},
    '34': {id: '3,4', row: 3, column: 4, type: 'forest', diceTarget: 4},
    '35': {id: '3,5', row: 3, column: 5, type: 'field', diceTarget: 8},
    '41': {id: '4,1', row: 4, column: 1, type: 'hill', diceTarget: 8},
    '42': {id: '4,2', row: 4, column: 2, type: 'pasture', diceTarget: 10},
    '43': {id: '4,3', row: 4, column: 3, type: 'pasture', diceTarget: 9},
    '44': {id: '4,4', row: 4, column: 4, type: 'mountain', diceTarget: 3},
    '51': {id: '5,1', row: 5, column: 1, type: 'mountain', diceTarget: 5},
    '52': {id: '5,2', row: 5, column: 2, type: 'field', diceTarget: 2},
    '53': {id: '5,3', row: 5, column: 3, type: 'forest', diceTarget: 6}
  },
  vertices: {
    '1,1': {
      id: '1,1',
      row: 1,
      column: 1,
      player: null,
      color: null,
      locationType: null
    },
    '1,2': {
      id: '1,2',
      row: 1,
      column: 2,
      player: null,
      color: null,
      locationType: null
    },
    '1,3': {
      id: '1,3',
      row: 1,
      column: 3,
      player: null,
      color: null,
      locationType: null
    },
    '2,2': {
      id: '2,2',
      row: 2,
      column: 2,
      player: null,
      color: null,
      locationType: null
    },
    '2,3': {
      id: '2,3',
      row: 2,
      column: 3,
      player: 2,
      color: 'green',
      locationType: 'settlement'
    },
    '2,4': {
      id: '2,4',
      row: 2,
      column: 4,
      player: null,
      color: null,
      locationType: null
    },
    '1,4': {
      id: '1,4',
      row: 1,
      column: 4,
      player: null,
      color: null,
      locationType: null
    },
    '1,5': {
      id: '1,5',
      row: 1,
      column: 5,
      player: null,
      color: null,
      locationType: null
    },
    '2,5': {
      id: '2,5',
      row: 2,
      column: 5,
      player: null,
      color: null,
      locationType: null
    },
    '2,6': {
      id: '2,6',
      row: 2,
      column: 6,
      player: null,
      color: null,
      locationType: null
    },
    '1,6': {
      id: '1,6',
      row: 1,
      column: 6,
      player: null,
      color: null,
      locationType: null
    },
    '1,7': {
      id: '1,7',
      row: 1,
      column: 7,
      player: null,
      color: null,
      locationType: null
    },
    '2,7': {
      id: '2,7',
      row: 2,
      column: 7,
      player: 3,
      color: 'blue',
      locationType: 'settlement'
    },
    '2,8': {
      id: '2,8',
      row: 2,
      column: 8,
      player: null,
      color: null,
      locationType: null
    },
    '2,1': {
      id: '2,1',
      row: 2,
      column: 1,
      player: null,
      color: null,
      locationType: null
    },
    '3,2': {
      id: '3,2',
      row: 3,
      column: 2,
      player: null,
      color: null,
      locationType: null
    },
    '3,3': {
      id: '3,3',
      row: 3,
      column: 3,
      player: 2,
      color: 'green',
      locationType: 'settlement'
    },
    '3,4': {
      id: '3,4',
      row: 3,
      column: 4,
      player: null,
      color: null,
      locationType: null
    },
    '3,5': {
      id: '3,5',
      row: 3,
      column: 5,
      player: 1,
      color: 'red',
      locationType: 'settlement'
    },
    '3,6': {
      id: '3,6',
      row: 3,
      column: 6,
      player: null,
      color: null,
      locationType: null
    },
    '3,7': {
      id: '3,7',
      row: 3,
      column: 7,
      player: 1,
      color: 'red',
      locationType: 'settlement'
    },
    '3,8': {
      id: '3,8',
      row: 3,
      column: 8,
      player: null,
      color: null,
      locationType: null
    },
    '2,9': {
      id: '2,9',
      row: 2,
      column: 9,
      player: null,
      color: null,
      locationType: null
    },
    '3,9': {
      id: '3,9',
      row: 3,
      column: 9,
      player: 3,
      color: 'blue',
      locationType: 'settlement'
    },
    '3,10': {
      id: '3,10',
      row: 3,
      column: 10,
      player: null,
      color: null,
      locationType: null
    },
    '3,1': {
      id: '3,1',
      row: 3,
      column: 1,
      player: null,
      color: null,
      locationType: null
    },
    '4,1': {
      id: '4,1',
      row: 4,
      column: 1,
      player: null,
      color: null,
      locationType: null
    },
    '4,2': {
      id: '4,2',
      row: 4,
      column: 2,
      player: null,
      color: null,
      locationType: null
    },
    '4,3': {
      id: '4,3',
      row: 4,
      column: 3,
      player: null,
      color: null,
      locationType: null
    },
    '4,4': {
      id: '4,4',
      row: 4,
      column: 4,
      player: null,
      color: null,
      locationType: null
    },
    '4,5': {
      id: '4,5',
      row: 4,
      column: 5,
      player: null,
      color: null,
      locationType: null
    },
    '4,6': {
      id: '4,6',
      row: 4,
      column: 6,
      player: null,
      color: null,
      locationType: null
    },
    '4,7': {
      id: '4,7',
      row: 4,
      column: 7,
      player: null,
      color: null,
      locationType: null
    },
    '4,8': {
      id: '4,8',
      row: 4,
      column: 8,
      player: null,
      color: null,
      locationType: null
    },
    '4,9': {
      id: '4,9',
      row: 4,
      column: 9,
      player: null,
      color: null,
      locationType: null
    },
    '3,11': {
      id: '3,11',
      row: 3,
      column: 11,
      player: null,
      color: null,
      locationType: null
    },
    '4,10': {
      id: '4,10',
      row: 4,
      column: 10,
      player: null,
      color: null,
      locationType: null
    },
    '4,11': {
      id: '4,11',
      row: 4,
      column: 11,
      player: null,
      color: null,
      locationType: null
    },
    '5,1': {
      id: '5,1',
      row: 5,
      column: 1,
      player: null,
      color: null,
      locationType: null
    },
    '5,2': {
      id: '5,2',
      row: 5,
      column: 2,
      player: null,
      color: null,
      locationType: null
    },
    '5,3': {
      id: '5,3',
      row: 5,
      column: 3,
      player: null,
      color: null,
      locationType: null
    },
    '5,4': {
      id: '5,4',
      row: 5,
      column: 4,
      player: 4,
      color: 'orange',
      locationType: 'settlement'
    },
    '5,5': {
      id: '5,5',
      row: 5,
      column: 5,
      player: null,
      color: null,
      locationType: null
    },
    '5,6': {
      id: '5,6',
      row: 5,
      column: 6,
      player: 4,
      color: 'orange',
      locationType: 'settlement'
    },
    '5,7': {
      id: '5,7',
      row: 5,
      column: 7,
      player: null,
      color: null,
      locationType: null
    },
    '5,8': {
      id: '5,8',
      row: 5,
      column: 8,
      player: null,
      color: null,
      locationType: null
    },
    '5,9': {
      id: '5,9',
      row: 5,
      column: 9,
      player: null,
      color: null,
      locationType: null
    },
    '6,1': {
      id: '6,1',
      row: 6,
      column: 1,
      player: null,
      color: null,
      locationType: null
    },
    '6,2': {
      id: '6,2',
      row: 6,
      column: 2,
      player: null,
      color: null,
      locationType: null
    },
    '6,3': {
      id: '6,3',
      row: 6,
      column: 3,
      player: null,
      color: null,
      locationType: null
    },
    '6,4': {
      id: '6,4',
      row: 6,
      column: 4,
      player: null,
      color: null,
      locationType: null
    },
    '6,5': {
      id: '6,5',
      row: 6,
      column: 5,
      player: null,
      color: null,
      locationType: null
    },
    '6,6': {
      id: '6,6',
      row: 6,
      column: 6,
      player: null,
      color: null,
      locationType: null
    },
    '6,7': {
      id: '6,7',
      row: 6,
      column: 7,
      player: null,
      color: null,
      locationType: null
    }
  },
  edges: {
    '1,1': {id: '1,1', row: 1, column: 1, color: null, player: null},
    '1,2': {id: '1,2', row: 1, column: 2, color: null, player: null},
    '2,1': {id: '2,1', row: 2, column: 1, color: null, player: null},
    '2,2': {id: '2,2', row: 2, column: 2, color: null, player: null},
    '3,2': {id: '3,2', row: 3, column: 2, color: null, player: null},
    '3,3': {id: '3,3', row: 3, column: 3, color: null, player: null},
    '1,3': {id: '1,3', row: 1, column: 3, color: null, player: null},
    '1,4': {id: '1,4', row: 1, column: 4, color: null, player: null},
    '2,3': {id: '2,3', row: 2, column: 3, color: null, player: null},
    '3,4': {id: '3,4', row: 3, column: 4, color: null, player: null},
    '3,5': {id: '3,5', row: 3, column: 5, color: null, player: null},
    '1,5': {id: '1,5', row: 1, column: 5, color: null, player: null},
    '1,6': {id: '1,6', row: 1, column: 6, color: null, player: null},
    '2,4': {id: '2,4', row: 2, column: 4, color: null, player: null},
    '3,6': {id: '3,6', row: 3, column: 6, color: null, player: null},
    '3,7': {id: '3,7', row: 3, column: 7, color: null, player: null},
    '3,1': {id: '3,1', row: 3, column: 1, color: null, player: null},
    '4,1': {id: '4,1', row: 4, column: 1, color: null, player: null},
    '4,2': {id: '4,2', row: 4, column: 2, color: 'green', player: 2},
    '5,2': {id: '5,2', row: 5, column: 2, color: null, player: null},
    '5,3': {id: '5,3', row: 5, column: 3, color: 'green', player: 2},
    '4,3': {id: '4,3', row: 4, column: 3, color: null, player: null},
    '5,4': {id: '5,4', row: 5, column: 4, color: null, player: null},
    '5,5': {id: '5,5', row: 5, column: 5, color: 'red', player: 1},
    '4,4': {id: '4,4', row: 4, column: 4, color: 'blue', player: 3},
    '5,6': {id: '5,6', row: 5, column: 6, color: 'red', player: 1},
    '5,7': {id: '5,7', row: 5, column: 7, color: null, player: null},
    '3,8': {id: '3,8', row: 3, column: 8, color: null, player: null},
    '4,5': {id: '4,5', row: 4, column: 5, color: null, player: null},
    '5,8': {id: '5,8', row: 5, column: 8, color: 'blue', player: 3},
    '5,9': {id: '5,9', row: 5, column: 9, color: null, player: null},
    '5,1': {id: '5,1', row: 5, column: 1, color: null, player: null},
    '6,1': {id: '6,1', row: 6, column: 1, color: null, player: null},
    '6,2': {id: '6,2', row: 6, column: 2, color: null, player: null},
    '7,1': {id: '7,1', row: 7, column: 1, color: null, player: null},
    '7,2': {id: '7,2', row: 7, column: 2, color: null, player: null},
    '6,3': {id: '6,3', row: 6, column: 3, color: null, player: null},
    '7,3': {id: '7,3', row: 7, column: 3, color: null, player: null},
    '7,4': {id: '7,4', row: 7, column: 4, color: null, player: null},
    '6,4': {id: '6,4', row: 6, column: 4, color: null, player: null},
    '7,5': {id: '7,5', row: 7, column: 5, color: null, player: null},
    '7,6': {id: '7,6', row: 7, column: 6, color: null, player: null},
    '6,5': {id: '6,5', row: 6, column: 5, color: null, player: null},
    '7,7': {id: '7,7', row: 7, column: 7, color: null, player: null},
    '7,8': {id: '7,8', row: 7, column: 8, color: null, player: null},
    '5,10': {id: '5,10', row: 5, column: 10, color: null, player: null},
    '6,6': {id: '6,6', row: 6, column: 6, color: null, player: null},
    '7,9': {id: '7,9', row: 7, column: 9, color: null, player: null},
    '7,10': {id: '7,10', row: 7, column: 10, color: null, player: null},
    '8,1': {id: '8,1', row: 8, column: 1, color: null, player: null},
    '8,2': {id: '8,2', row: 8, column: 2, color: null, player: null},
    '9,1': {id: '9,1', row: 9, column: 1, color: null, player: null},
    '9,2': {id: '9,2', row: 9, column: 2, color: null, player: null},
    '8,3': {id: '8,3', row: 8, column: 3, color: null, player: null},
    '9,3': {id: '9,3', row: 9, column: 3, color: null, player: null},
    '9,4': {id: '9,4', row: 9, column: 4, color: 'orange', player: 4},
    '8,4': {id: '8,4', row: 8, column: 4, color: null, player: null},
    '9,5': {id: '9,5', row: 9, column: 5, color: 'orange', player: 4},
    '9,6': {id: '9,6', row: 9, column: 6, color: null, player: null},
    '8,5': {id: '8,5', row: 8, column: 5, color: null, player: null},
    '9,7': {id: '9,7', row: 9, column: 7, color: null, player: null},
    '9,8': {id: '9,8', row: 9, column: 8, color: null, player: null},
    '10,1': {id: '10,1', row: 10, column: 1, color: null, player: null},
    '10,2': {id: '10,2', row: 10, column: 2, color: null, player: null},
    '11,1': {id: '11,1', row: 11, column: 1, color: null, player: null},
    '11,2': {id: '11,2', row: 11, column: 2, color: null, player: null},
    '10,3': {id: '10,3', row: 10, column: 3, color: null, player: null},
    '11,3': {id: '11,3', row: 11, column: 3, color: null, player: null},
    '11,4': {id: '11,4', row: 11, column: 4, color: null, player: null},
    '10,4': {id: '10,4', row: 10, column: 4, color: null, player: null},
    '11,5': {id: '11,5', row: 11, column: 5, color: null, player: null},
    '11,6': {id: '11,6', row: 11, column: 6, color: null, player: null}
  },
  robberLocation: {id: '3,1', row: 3, column: 1, type: 'desert', diceTarget: 0},
  orderedVertices: [
    '1,1',
    '1,2',
    '1,3',
    '1,4',
    '1,5',
    '1,6',
    '1,7',
    '2,1',
    '2,2',
    '2,3',
    '2,4',
    '2,5',
    '2,6',
    '2,7',
    '2,8',
    '2,9',
    '3,1',
    '3,2',
    '3,3',
    '3,4',
    '3,5',
    '3,6',
    '3,7',
    '3,8',
    '3,9',
    '3,10',
    '3,11',
    '4,1',
    '4,2',
    '4,3',
    '4,4',
    '4,5',
    '4,6',
    '4,7',
    '4,8',
    '4,9',
    '4,10',
    '4,11',
    '5,1',
    '5,2',
    '5,3',
    '5,4',
    '5,5',
    '5,6',
    '5,7',
    '5,8',
    '5,9',
    '6,1',
    '6,2',
    '6,3',
    '6,4',
    '6,5',
    '6,6',
    '6,7'
  ],
  vertexColumnsMap: {'1': 7, '2': 9, '3': 11, '4': 11, '5': 9, '6': 7}
}
