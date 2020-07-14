import { Engine, Component, Scene, Transform } from '@pariruram/ecs'
import { asteroid as asteroidEntity, player as playerEntity } from 'entities/index'
import { initEntity } from 'helpers'
import { config } from '@Root/config'
import { UIController } from '.'

export enum gameState {
  startScreen,
  inProgress,
  isEnded,
}

export class GameController extends Component {
  transform: Transform
  static levelScene: Scene
  static gameState: gameState = gameState.startScreen
  static playerScore: number = 0

  onAwake(): void {
    this.transform = this.getComponent(Transform)
    const scene = Engine.getScene('level')
    if (scene) {
      GameController.levelScene = scene
    }
    console.log('awake')
  }

  static startGame(): void {
    GameController.gameState = gameState.inProgress
    this.playerScore = 0
    this.levelScene.clear()
    UIController.onGameStart()
    initEntity(playerEntity, this.levelScene)
    for (let i = 0; i < config.asteroidsCount; i++) {
      initEntity(asteroidEntity, this.levelScene)
    }
  }

  static endGame(): void {
    GameController.gameState = gameState.isEnded
    UIController.onGameEnd()
  }

  onReceiveData(data): void {
    console.log(data)
  }
}
