import { Entity, Scene, Prefab } from '@pariruram/ecs'

export const initEntity = (prefab: Prefab, scene: Scene): Entity => {
  const entity = new Entity()
  const { data } = prefab

  for (let i = 0; i < data.length; i++) {
    const component = new data[i]()
    entity.add(component)
    entity.prefab = prefab
  }

  scene.add(entity)

  return entity
}
