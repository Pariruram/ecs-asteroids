import { Component, Tag, Collider, Transform, IPosition, Renderer } from '@pariruram/ecs'
import { AsteroidController } from './asteroid-controller'

export class BulletController extends Component {
  transform: Transform
  collider: Collider
  renderer: Renderer
  tag: Tag
  position: IPosition
  size: number = 3
  speed: number = 0.5
  direction: number = 0
  color: string = `rgba(255, 255, 255, 255)`

  // TODO: since we cannot use onAwake on pooled objects, need something like onSpawn()/onDespawn() methods
  // or just manualy call onAwake...
  // and it looks like constructor, but it isn't it.
  // setting Pivot to center must be by default in some engine component
  // and collider stuff.
  // TODO: clean all onAwake methods. - API improvements
  onAwake(): void {
    this.transform = this.getComponent(Transform)
    this.collider = this.getComponent(Collider)
    this.renderer = this.getComponent(Renderer)
    this.tag = this.getComponent(Tag)
    this.position = this.transform.getPosition()
    this.tag.set('bullet')
    this.transform.setScale(this.size, this.size, 1)
    this.transform.setPivot({
      x: this.size / 2,
      y: this.size / 2,
      z: this.size / 2,
    })
    this.collider.updateCollider([0, 0, this.size, this.size])
    this.renderer.color = this.color
  }

  update(dt: number): void {
    this.position.x += this.speed * dt * Math.cos(this.direction)
    this.position.y += this.speed * dt * Math.sin(this.direction)

    if (
      this.position.x > Renderer.getWidth() ||
      this.position.x < 0 ||
      this.position.y > Renderer.getHeight() ||
      this.position.y < 0
    ) {
      // TODO: parent...double meanings...parentEntity maybe or something more accurate
      // BAD: calling callback; destroy() instead.
      this.destroy()
    }

    for (let i = 0; i < this.collider.collisions.length; i++) {
      if (this.collider.collisions[i].tag === 'asteroid') {
        const asteroidController = this.collider.collisions[i].entity.getComponent(AsteroidController)
        asteroidController.onHit()
        this.collider.collisions = []
        this.destroy()
      }
    }
  }
}
