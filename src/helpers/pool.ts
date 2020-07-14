import { Entity, Scene, Prefab } from '@pariruram/ecs'
import { initEntity } from './init-entity'

// TODO: do we need an ID?
interface IPoolSlot {
  inUse: boolean
  id: number
}

class PoolSlot<T> implements IPoolSlot {
  inUse: boolean = false
  id: number = 0
  entity: T
  onDestroy: Function

  constructor(entity: T) {
    this.entity = entity
  }
}

export class Pool {
  storage: Array<PoolSlot<Entity>> = []
  current: number = 0
  source: Prefab
  scene: Scene

  constructor(scene, entity, count = 1) {
    this.source = entity
    this.scene = scene
    this.createPool(scene, entity, count)
  }

  createPool(scene: Scene, entity: Prefab, count: number): void {
    for (let i = 0; i < count; i++) {
      const newEntity = initEntity(entity, scene)
      const slot = new PoolSlot(newEntity)

      slot.id = newEntity.id
      slot.inUse = false
      // TODO: remove logic from pool. Pool is about getting link to stored entity.
      // newEntity.onDestroy = (): void => this.despawn(slot)
      this.storage.push(slot)
    }
  }

  extendPool(count = 2) {
    for (let i = 0; i < count; i++) {
      const newEntity = initEntity(this.source, this.scene)
      const slot = new PoolSlot(newEntity)

      slot.id = newEntity.id
      slot.inUse = false
      // newEntity.onDestroy = () => this.despawn(slot)
      this.storage.push(slot)
    }
  }

  getNextCurrentIndex(): number {
    // TODO: simplify, remove temp variable
    const startedNumber = this.current
    while (this.storage[this.current].inUse) {
      this.current++

      if (this.current >= this.storage.length) {
        this.current = 0
      }
      if (this.current === startedNumber) {
        this.extendPool()
      }
    }

    return this.current
  }

  spawn(): Entity {
    const index = this.getNextCurrentIndex()
    this.storage[index].inUse = true

    return this.storage[index].entity
  }

  despawn(slot: IPoolSlot): void {
    slot.inUse = false
  }
}
