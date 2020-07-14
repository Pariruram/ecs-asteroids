import { Tag, Transform, Renderer, Collider, Prefab } from '@pariruram/ecs'
import { BulletController } from '../controllers'

export const bullet: Prefab = {
  name: 'bullet',
  data: [Tag, Transform, Renderer, Collider, BulletController],
}
