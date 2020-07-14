import { Tag, Transform, Renderer, Collider, Prefab } from '@pariruram/ecs'
import { PlayerController } from 'controllers'
import { SpaceBoundsCollision, Spaceship, PlayerMovement } from 'components'

export const player: Prefab = {
  name: 'player',
  data: [Tag, Transform, Renderer, Collider, SpaceBoundsCollision, PlayerMovement, PlayerController, Spaceship],
}
