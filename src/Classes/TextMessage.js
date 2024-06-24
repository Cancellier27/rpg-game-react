import {KeyPressListener} from "./KeyPressListener"
import {TEXT_APPEARING_SPEED} from "../helpers/consts"

export class TextMessage {
  constructor({text, onComplete}) {
    this.text = text
    this.onComplete = onComplete

    this.speed = TEXT_APPEARING_SPEED

    this.typewriterText = ""
    this.textIndex = 0
    this.timeout = null
    this.isDone = false
  }

  closeOnEnter(map) {
    this.displayTypewriterMessage(map)

    this.actionListener = new KeyPressListener("Enter", () => {
      if (this.isDone) {
        this.actionListener.unbind()
        map.isMessageDisplaying = false
        map.messageText = ""
        this.onComplete()
      } else {
        this.isDone = true
        clearInterval(this.timeout)
        map.messageText = this.text
      }
    })
  }

  displayTypewriterMessage(map) {
    map.messageText = this.typewriterText

    this.timeout = setInterval(() => {
      map.messageText += this.text[this.textIndex]
      this.textIndex += 1

      if (this.textIndex === this.text.length) {
        this.isDone = true
        clearInterval(this.timeout)
      }
    }, this.speed)
  }

  init(map) {
    this.closeOnEnter(map)
    map.isMessageDisplaying = true
    map.messageOnComplete = this.onComplete
  }
}
