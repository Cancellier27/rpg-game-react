export class TextMessage {
  constructor({text, onComplete}) {
    this.text = text || ""
    this.onComplete = onComplete || {}
    this.element = null
  }

  getState() {
    return this.text
  }
}