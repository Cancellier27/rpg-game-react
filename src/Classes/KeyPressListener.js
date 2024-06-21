export class KeyPressListener {
  constructor(keyCode, callback) {
    let keySafe = true
    this.KeyDownFunction = function (event) {
      if (event.code === keyCode) {
        if (keySafe) {
          keySafe = false
          callback()
        }
      }
    }
    this.KeyUpFunction = function (event) {
      if (event.code === keyCode) {
        keySafe = true
      }
    }

    document.addEventListener("keydown", this.KeyDownFunction)
    document.addEventListener("keyup", this.KeyUpFunction)
  }

  unbind() {
    document.removeEventListener("keydown", this.KeyDownFunction)
    document.removeEventListener("keyup", this.KeyUpFunction)
  }
}
