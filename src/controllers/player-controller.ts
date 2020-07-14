import {
  Component,
  Entity,
  PhysicsObject2D,
  Tag,
  Collider,
  Transform,
  IPosition,
  IScale,
  Renderer,
  InputSystem,
} from '@pariruram/ecs'

import { initEntity } from '../helpers'
import { bullet } from '../entities/index'
import { Spaceship } from '../components'
import { GameController } from '.'
import { BulletController } from './bullet-controller'

const normalize = ([x, y]): Array<number> => {
  const length = Math.sqrt(Math.abs(x * x + y * y))

  return [x / length, y / length]
}
export class PlayerController extends Component {
  input: InputSystem
  transform: Transform
  physicsObject2D: PhysicsObject2D
  collider: Collider
  tag: Tag
  scale: IScale
  position: IPosition
  size: number = 15
  // bullets: Pool = new Pool(bullet)
  shootingDelay: number = 7
  shootingTimeout: number = 0
  color: string = ''

  onAwake(): void {
    this.transform = this.getComponent(Transform)
    this.physicsObject2D = this.getComponent(PhysicsObject2D)
    this.collider = this.getComponent(Collider)
    this.tag = this.getComponent(Tag)
    this.position = this.transform.getPosition()
    this.scale = this.transform.getScale()
    this.transform.setPosition({
      x: Renderer.getWidth() / 2,
      y: Renderer.getHeight() / 2,
      z: 1,
    })
    this.transform.setPivot({
      x: this.size / 2,
      y: this.size / 2,
      z: this.size / 2,
    })
    this.tag.set('player')
    this.scale.x = this.size
    this.scale.y = this.size
    this.collider.updateCollider([0, 0, this.size, this.size])
    this.transform.setRotation(0)
    this.color = this.getComponent(Spaceship).color
  }

  update(): void {
    if (this.collider.collisions.length) {
      if (this.collider.collisions[0].tag === 'asteroid') {
        GameController.endGame()
        this.destroy()
      }
    }

    if (InputSystem.getKey('Action') && !this.shootingTimeout) {
      this.spawnBullet()
      this.shootingTimeout = this.shootingDelay
    }

    if (this.shootingTimeout > 0) {
      --this.shootingTimeout
    }
    if (this.shootingTimeout < 0) {
      this.shootingTimeout = 0
    }
  }

  spawnBullet(): void {
    const bulletEntity: Entity = initEntity(bullet, this.getScene())
    const bulletController: BulletController = bulletEntity.getComponent(BulletController)
    const bulletTransform: Transform = bulletEntity.getComponent(Transform)
    const bulletRenderer: Renderer = bulletEntity.getComponent(Renderer)
    const centerPosition: IPosition = {
      x: this.position.x + this.transform.pivot.x - bulletController.size / 2,
      y: this.position.y + this.transform.pivot.y - bulletController.size / 2,
      z: 0,
    }

    bulletRenderer.color = this.color
    bulletTransform.setPosition(centerPosition)
    bulletController.direction = this.transform.getRotation()
  }

  onReceiveData(data): void {
    console.log(data)
  }

  onMouseDown(e): void {
    const { x, y } = e
    const newVector = normalize([x - this.position.x, y - this.position.y])

    this.transform.setRotation(Math.atan2(newVector[1], newVector[0]))
  }
}
