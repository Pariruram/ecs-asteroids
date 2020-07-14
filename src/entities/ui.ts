import { Prefab } from '@pariruram/ecs'
import { UIController } from 'controllers'

export const ui: Prefab = {
  name: 'ui',
  data: [UIController],
}
