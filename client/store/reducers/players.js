const defaultState = {
  1: {
    resources: {
      forest: 1,
      field: 1,
      hill: 1,
      mountain: 1,
      pasture: 1
    },
    score: 0
  },
  2: {
    resources: {
      forest: 2,
      field: 2,
      hill: 2,
      mountain: 2,
      pasture: 2
    },
    score: 0
  },
  3: {
    resources: {
      forest: 3,
      field: 3,
      hill: 3,
      mountain: 3,
      pasture: 3
    },
    score: 0
  },
  4: {
    resources: {
      forest: 4,
      field: 4,
      hill: 4,
      mountain: 4,
      pasture: 4
    },
    score: 0
  }
}

const players = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default players
