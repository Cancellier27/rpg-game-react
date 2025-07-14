let fs, path
let savePath

function isElectron() {
  return typeof window !== "undefined" && window.process?.type === "renderer" && typeof window.require === "function"
}

function init(map) {
  if (isElectron()) {
    fs = window.require("fs")
    path = window.require("path")
    // Instead of using deprecated remote, use this workaround:
    savePath = path.join("C:/Dev/pizza-legends-react/src/gameSaveState/mapEnemiesData", `${map}.json`) // or use __dirname/build folder if you prefer
  }
}

export const updateState = {
  updateHeroState(saveState, heroStatus) {
    Object.keys(saveState).forEach((key) => {
      saveState[key] = heroStatus[key]
    })
  },
  saveMapData(data, map) {
    if (!savePath) init(map)
    if (fs && savePath) {
      fs.writeFileSync(savePath, JSON.stringify(data, null, 2))
      console.log("Game saved to", savePath)
    } else {
      console.warn("Save failed: Not running in Electron")
    }
  },
  loadMapData(map) {
    if (!savePath) init(map)
    if (fs && savePath && fs.existsSync(savePath)) {
      const raw = fs.readFileSync(savePath, "utf-8")
      return JSON.parse(raw)
    } else {
      console.warn("Load failed: Save file not found or not in Electron")
      return null
    }
  }
}
