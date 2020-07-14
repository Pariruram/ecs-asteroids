import { Engine, Scene, UpdateSystem, Physics, CanvasRenderer, InputSystem, Utils } from '@pariruram/ecs'
import { setColorTheme, createWrapper } from './ui'
import { initEntity } from './helpers'
import { game, ui } from './entities'

setColorTheme()

function initEngine(): void {
  const container = createWrapper()
  Engine.addSystem(new UpdateSystem())
  Engine.addSystem(new Physics())
  Engine.addSystem(new CanvasRenderer(container))
  Engine.addSystem(new InputSystem())
  Engine.addSystem(new Utils.FpsCounter())

  Engine.startLoop()
}

export function main(): void {
  initEngine()
  const levelScene = new Scene()
  const globalScene = new Scene()
  Engine.addScene('level', levelScene)
  Engine.addScene('global', globalScene)
  initEntity(game, globalScene)
  initEntity(ui, globalScene)
}

main()
