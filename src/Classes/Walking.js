export class Walking {
  constructor(config) {
    this.animations = config.animations || {
      "idle-down" : [ [0,0] ],
      "idle-right": [ [0,1] ],
      "idle-up"   : [ [0,2] ],
      "idle-left" : [ [0,3] ],
      "walk-down" : [ [1,0],[0,0],[3,0],[0,0], ],
      "walk-right": [ [1,1],[0,1],[3,1],[0,1], ],
      "walk-up"   : [ [1,2],[0,2],[3,2],[0,2], ],
      "walk-left" : [ [1,3],[0,3],[3,3],[0,3], ]
    }
    
    this.currentAnimation = config.currentAnimation || "idle-down"
    this.currentAnimationFrame = 0

    this.animationFrameLimit = config.animationFrameLimit || 8
    this.animationFrameProgress = this.animationFrameLimit
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key
      this.currentAnimationFrame = 0
      this.animationFrameProgress = this.animationFrameLimit
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1
      return
    }

    //Reset the counter
    this.animationFrameProgress = this.animationFrameLimit
    this.currentAnimationFrame += 1

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }

  walk() {
    this.updateAnimationProgress()
  }
  
}
