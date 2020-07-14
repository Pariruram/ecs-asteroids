import { Component, Transform, IPosition, InputSystem } from '@pariruram/ecs'

export class PlayerMovement extends Component {
  transform: Transform
  position: IPosition
  thrusterVelocity: number = 0
  angleVelocity: number = 0.08
  maxSpeed: number = 0.2
  acceleration: number = 0.0001
  direction: number = 0
  speed: number = 0
  slowSpeed: number = 0

  onAwake(): void {
    this.transform = this.getComponent(Transform)
    this.position = this.transform.getPosition()
  }

  update(dt: number): void {
    const rotation = this.transform.getRotation()

    if (InputSystem.getKey('Left')) {
      this.transform.setRotation(rotation - this.angleVelocity)
    }
    if (InputSystem.getKey('Right')) {
      this.transform.setRotation(rotation + this.angleVelocity)
    }
    if (!InputSystem.getKey('Up')) {
      this.thrusterVelocity = 0
    } else {
      if (this.thrusterVelocity < this.maxSpeed) {
        this.thrusterVelocity += this.acceleration
      }
      const vector = [Math.cos(rotation) * this.thrusterVelocity, Math.sin(rotation) * this.thrusterVelocity]
      const currentVector = [Math.cos(this.direction) * this.speed, Math.sin(this.direction) * this.speed]
      const resultVector = [currentVector[0] + vector[0], currentVector[1] + vector[1]]

      this.direction = Math.atan2(resultVector[1], resultVector[0])
      this.speed = resultVector[0] / Math.cos(this.direction)
    }

    this.position.x += this.speed * dt * Math.cos(this.direction)
    this.position.y += this.speed * dt * Math.sin(this.direction)

    if (this.speed > 0) {
      this.speed -= this.slowSpeed
    }
    if (this.speed < 0) {
      this.speed = 0
    }
    if (this.speed < this.thrusterVelocity) {
      this.speed = this.thrusterVelocity
    }
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed
    }
  }
}
