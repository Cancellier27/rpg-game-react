export class TextMessage {
  constructor({text, onComplete}) {
    this.text = text || ""
    this.onComplete = onComplete || {}
    this.element = null
    this.isShowingMessage = false
  }

  getState() {
    return this.text
  }
}