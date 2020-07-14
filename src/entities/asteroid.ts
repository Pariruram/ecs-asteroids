import { Tag, Transform, Renderer, Collider, Prefab } from '@pariruram/ecs'
import { AsteroidController } from 'controllers'
import { SpaceBoundsCollision, Asteroid } from 'components'

export const asteroid: Prefab = {
  name: 'asteroid',
  data: [Tag, Transform, Renderer, Collider, Asteroid, AsteroidController, SpaceBoundsCollision],
}
