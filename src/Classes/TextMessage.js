import {KeyPressListener} from "./KeyPressListener"

export class TextMessage {
  constructor({text, onComplete}) {
    this.text = text
    this.onComplete = onComplete
  }

  createElement(map) {
    this.actionListener = new KeyPressListener("Enter", () => {
      this.actionListener.unbind()
      map.isMessageDisplaying = false
      map.messageText = ""
      this.onComplete()
    })
  }

  init(map) {
    this.createElement(map)
    map.isMessageDisplaying = true
    map.messageText = this.text
    map.messageOnComplete = this.onComplete
  }
}
