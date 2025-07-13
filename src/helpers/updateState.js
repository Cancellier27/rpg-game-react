export const updateState = {
  updateHeroState(saveState, heroStatus) {
    Object.keys(saveState).forEach((key) => {
      saveState[key] = heroStatus[key]
    })
  }
}
