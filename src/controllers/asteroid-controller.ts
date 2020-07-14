import { Component, Tag, Collider, Transform, IPosition, Renderer, Entity } from '@pariruram/ecs'

import { initEntity, getRandomRGBAColor } from 'helpers'
import { asteroid } from 'entities/index'
import { Asteroid } from 'components'
import { GameController } from '.'

const getRandomVelocity = (): number => (Math.random() / 10) * (Math.random() > 0.5 ? 1 : -1)

export class AsteroidController extends Component {
  transform: Transform
  collider: Collider
  renderer: Renderer
  tag: Tag
  position: IPosition
  size: number = 30
  impulse: number = Math.random() / 10
  angleVelocity: number = getRandomVelocity()
  direction: number = Math.random() * Math.PI
  color: string = getRandomRGBAColor()
  scoreBonus: number = 30

  onAwake(): void {
    this.transform = this.getComponent(Transform)
    this.collider = this.getComponent(Collider)
    this.renderer = this.getComponent(Renderer)
    this.tag = this.getComponent(Tag)
    this.tag.set('asteroid')
    this.position = this.transform.getPosition()
    this.transform.setPosition({
      x: Math.random() * Renderer.getWidth(),
      y: Math.random() * Renderer.getHeight(),
      z: 1,
    })
    this.setSize(this.size)
    this.renderer.color = this.color
  }

  update(dt: number): void {
    const rotation: number = this.transform.getRotation()
    this.transform.setRotation(rotation + this.angleVelocity)

    this.position.x += this.impulse * dt * Math.cos(this.direction)
    this.position.y += this.impulse * dt * Math.sin(this.direction)
  }

  onHit(): void {
    GameController.playerScore += this.scoreBonus
    if (this.size <= 5) {
      this.destroy()
      return
    }
    this.spawnChildrens()
    this.destroy()
  }

  spawnChildrens(): void {
    for (let i = 0; i < 2; i++) {
      const asteroidEntity: Entity = initEntity(asteroid, this.getScene())
      const transform: Transform = asteroidEntity.getComponent(Transform)
      const controller: AsteroidController = asteroidEntity.getComponent(AsteroidController)

      transform.setPosition(this.position)
      controller.setSize(this.size - 5)
    }
  }

  setSize(size: number): void {
    this.size = size
    this.transform.setScale(size, size, 1)
    this.transform.setPivot({
      x: size / 2,
      y: size / 2,
      z: size / 2,
    })
    this.collider.updateCollider([0, 0, size, size])
    this.getComponent(Asteroid).updatePath()
  }
}
