import {
  CANVAS_SIZE,
  CELL_SIZE,
  X_ADJUSTMENT,
  Y_ADJUSTMENT
} from "./consts"

export const utils = {
  withGrid(n) {
    return n * CELL_SIZE
  }
}