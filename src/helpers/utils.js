import {
  CANVAS_SIZE,
  CELL_SIZE, // 16
  X_ADJUSTMENT,
  Y_ADJUSTMENT
} from "./consts"

export const utils = {
  withGrid(n) {
    return n * CELL_SIZE
  },

  asGridCoord(x, y) {
    return `${x * CELL_SIZE}, ${y * CELL_SIZE}`
  },

  nextPosition(initialX, initialY, direction) {
    let x = initialX
    let y = initialY

    if (direction === "left") {
      x -= CELL_SIZE
    } else if (direction === "right") {
      x += CELL_SIZE
    } else if (direction === "up") {
      y -= CELL_SIZE
    } else if (direction === "down") {
      y += CELL_SIZE
    }

    return {x, y}
  },

  oppositeDirection(direction) {
    if (direction === "right") {
      return "left"
    } else if (direction === "left") {
      return "right"
    } else if (direction === "up") {
      return "down"
    } else return "up"
  },

  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail: detail
    })
    document.dispatchEvent(event)
  }
}
