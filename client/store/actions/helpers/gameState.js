import {getEdgeNeighbors} from './board'

export const adjustResourcesFromTo = (from, to, players) => {
  return players.map(player => {
    const {id, resources} = player
    return id === from
      ? {...player, resources: resources - 1}
      : id === to ? {...player, resources: resources + 1} : player
  })
}

export const subtractResourceCard = (card, resources) => {
  return resources.map(resource => {
    return resource.type === card
      ? {...resource, quantity: resource.quantity - 1}
      : resource
  })
}

export const createResourceCardsArray = resources => {
  return resources.reduce((acc, val) => {
    acc = [...acc, ...Array(val.quantity).fill(val.type)]
    return acc
  }, [])
}

/* eslint-disable complexity */
export const getLongestRoad = (
  edge,
  board,
  visited = [],
  firstChecked = false,
  callCount = 0
) => {
  let fullResource = checkIfFullResource(edge, board)
  if (fullResource && visited.length === 0) {
    visited = visited.concat(fullResource.edges)
    const newPaths = []
    fullResource.vertices.forEach(vertex => {
      vertex.edges.forEach(newPath => {
        if (newPath.color === edge.color && !visited.includes(newPath)) {
          newPaths.push(newPath)
        }
      })
    })
    const lens = newPaths.map(p =>
      getLongestRoad(p, board, visited, false, callCount + 1)
    )
    if (lens.length === 0) {
      return 6
    } else {
      return 6 + Math.max(...lens)
    }
  } else {
    let paths = []
    edge.vertices.forEach(vertex => {
      vertex.edges.forEach(e => {
        if (e.color === edge.color && e !== edge) {
          paths.push(e)
        }
      })
    })

    visited.push(edge)

    paths = paths.reduce((rtn, path) => {
      if (!visited.includes(path)) rtn.push(path)
      return rtn
    }, [])

    if (paths.length === 0) {
      if (callCount > 2) {
        let potentialLastPaths = []
        edge.vertices.forEach(v => {
          v.edges.forEach(potential => {
            if (potential.color === edge.color && potential !== edge) {
              potentialLastPaths.push(potential)
            }
          })
        })
        let hasConnector = false
        potentialLastPaths.forEach(final => {
          if (visited[visited.length - 2] !== final && visited[0] !== final)
            hasConnector = true
        })
        return hasConnector ? 2 : 1
      } else {
        return 1
      }
    } else if (fullResource && !firstChecked) {
      const lengths = paths.map(path => {
        let otherVisited = paths.filter(p => p !== path)
        otherVisited = otherVisited.concat(visited)
        return (
          1 + getLongestRoad(path, board, otherVisited, true, callCount + 1)
        )
      })
      const longestPath = Math.max(...lengths)
      return Math.max(6, longestPath)
    } else if (fullResource) {
      const lengths = paths.map(path => {
        let otherVisited = paths.filter(p => p !== path)
        otherVisited = otherVisited.concat(visited)
        return (
          1 + getLongestRoad(path, board, otherVisited, true, callCount + 1)
        )
      })
      const longestPath = Math.max(...lengths)
      return longestPath
    } else {
      const lengths = paths.map(path => {
        let otherVisited = paths.filter(p => p !== path)
        otherVisited = otherVisited.concat(visited)
        return (
          1 + getLongestRoad(path, board, otherVisited, false, callCount + 1)
        )
      })
      const longestPath = Math.max(...lengths)
      return longestPath
    }
  }
}

export const checkIfFullResource = (edge, board) => {
  let subjectResources = []
  for (const resource in board.resources) {
    board.resources[resource].edges.forEach(e => {
      if (e.id === edge.id) {
        subjectResources.push(board.resources[resource])
      }
    })
  }

  let targetFull
  subjectResources.forEach(r => {
    let isFull = true
    r.edges.forEach(side => {
      if (side.color !== edge.color) {
        isFull = false
      }
    })
    if (isFull) targetFull = r
  })

  return targetFull
}
