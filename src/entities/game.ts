import { Prefab, Transform } from '@pariruram/ecs'
import { GameController } from 'controllers'

export const game: Prefab = {
  name: 'gameController',
  data: [GameController, Transform],
}
