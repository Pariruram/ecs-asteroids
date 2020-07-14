import { Component, InputSystem, CanvasRenderer, Renderer } from '@pariruram/ecs'
import { getRandomRGBAColor } from 'helpers'
import { GameController } from '.'
import { gameState } from './game-controller'

// TODO:  hm...maybe use React? :D
export class UIController extends Component {
  input: InputSystem
  static score: HTMLElement
  static startButton: HTMLElement
  static gameOver: HTMLElement
  static restartButton: HTMLElement
  lastScore = 0

  onAwake(): void {
    const root = CanvasRenderer.getParentEl()
    // eslint-disable-next-line
    const uiContainer = createElement(UiContainer, root)
    // eslint-disable-next-line
    UIController.startButton = createElement(StartButton, uiContainer)
    // eslint-disable-next-line
    UIController.score = createElement(Score, uiContainer)
    // eslint-disable-next-line
    UIController.gameOver = createElement(GameOver, uiContainer)
    // eslint-disable-next-line
    UIController.restartButton = createElement(RestartButton, uiContainer)
    window.addEventListener('resize', this.handleResize.bind(this))
    this.handleResize()
  }

  update(): void {
    if (this.lastScore === GameController.playerScore) return

    this.lastScore = GameController.playerScore
    UIController.updateScore()
  }

  onClick(e): void {
    if (e.target === UIController.startButton) {
      UIController.handleStart()
    }
    if (e.target === UIController.restartButton) {
      UIController.handleRestart()
    }
  }

  onKeyPress(e): void {
    const isActionButtonPressed = InputSystem.getKey('Action')
    if (isActionButtonPressed && GameController.gameState !== gameState.inProgress) {
      UIController.handleStart()
    }
  }

  handleResize(): void {
    this.updateGameOverLabel()
  }

  updateGameOverLabel(): void {
    UIController.gameOver.style.transform = `translate(50%, calc(50% - ${Renderer.getHeight() / 13 + 60}px))`
    UIController.gameOver.style.fontSize = `${Renderer.getHeight() / 13}px`
  }

  static updateScore(): void {
    this.score.innerHTML = String(GameController.playerScore)
    this.score.style.color = getRandomRGBAColor()
  }

  static handleStart(): void {
    GameController.startGame()
  }

  static handleRestart(): void {
    GameController.startGame()
  }

  static onGameEnd(): void {
    this.gameOver.style.display = 'block'
    this.restartButton.style.display = 'block'
    this.restartButton.style.color = getRandomRGBAColor()
    this.restartButton.style.border = `2px solid ${getRandomRGBAColor()}`
  }

  static onGameStart(): void {
    this.gameOver.style.display = 'none'
    this.startButton.style.display = 'none'
    this.restartButton.style.display = 'none'
    this.score.style.color = getRandomRGBAColor()
  }
}

const createElement = (data, parent: HTMLElement = document.body): HTMLElement => {
  const { tag = 'div', text = '', style = '' } = data
  const element = document.createElement(tag)

  element.innerHTML = text
  element.style = style
  parent.appendChild(element)

  return element
}

const UiContainer = {
  style: `
    position: absolute;
    width: 100%;
    height: 100%;
  `,
}

const Score = {
  text: '0',
  style: `
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 40px;
    color: ${getRandomRGBAColor()};
  `,
}

const StartButton = {
  text: 'START',
  tag: 'button',
  style: `
    position: absolute;
    top: 50%;
    right: 50%;
    font-size: 20px;
    transform: translate(50%, -50%);
    background-color: transparent;
    border: 2px solid ${getRandomRGBAColor()};
    padding: 8px 17px;
    color: ${getRandomRGBAColor()};
    cursor: pointer;
  `,
}

const RestartButton = {
  text: 'RESTART',
  tag: 'button',
  style: `
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    display: none;
    font-size: 20px;
    background-color: transparent;
    border: 2px solid ${getRandomRGBAColor()};
    padding: 8px 17px;
    color: ${getRandomRGBAColor()};
    cursor: pointer;
  `,
}

const GameOver = {
  // text: 'Game over!',
  style: `
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -${Renderer.getHeight() / 13 + 20};);
    font-size: ${Renderer.getHeight() / 13};
    color: ${getRandomRGBAColor()};
    text-transform: uppercase;
    display: none;
    white-space: nowrap;
  `,
}
