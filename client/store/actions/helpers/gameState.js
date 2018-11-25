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
      : {...resource}
  })
}

export const createResourceCardsArray = resources => {
  return resources.reduce((acc, val) => {
    acc = [...acc, ...Array(val.quantity).fill(val.type)]
    return acc
  }, [])
}
