import { Component, Collider, Transform, IPosition, Renderer } from '@pariruram/ecs'

export class SpaceBoundsCollision extends Component {
  transform: Transform
  collider: Collider
  position: IPosition
  colliderBounds: Array<number> = []

  onAwake(): void {
    this.transform = this.getComponent(Transform)
    this.collider = this.getComponent(Collider)
    this.position = this.transform.getPosition()
    this.colliderBounds = this.collider.getCollider()
  }

  update(): void {
    const x1 = this.position.x
    const y1 = this.position.y
    const x2 = this.position.x + this.colliderBounds[2]
    const y2 = this.position.y + this.colliderBounds[3]
    const width = Renderer.getWidth()
    const heigh = Renderer.getHeight()

    if (x1 > width) {
      this.position.x = 0
    }

    if (x2 < 0) {
      this.position.x = width
    }

    if (y2 < 0) {
      this.position.y = heigh
    }

    if (y1 > heigh) {
      this.position.y = 0
    }
  }
}
