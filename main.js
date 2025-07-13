const {app, BrowserWindow} = require("electron")
const path = require("path")

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    center: true,
    webPreferences: {
      nodeIntegration: true, // or preload script with contextIsolation true (recommended)
      contextIsolation: false
    }
  })

  // win.loadFile("build/index.html") // or 'dist/index.html' for Vite#
  // win.loadURL('http://localhost:3000');

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000")
  } else {
    win.loadFile(path.join(__dirname, "build", "index.html"))
  }
}

app.whenReady().then(createWindow)
