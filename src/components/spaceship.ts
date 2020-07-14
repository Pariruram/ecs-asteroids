import { Transform, IPosition, Renderer, Point } from '@pariruram/ecs'
import { getRandomRGBAColor } from '../helpers'

export class Spaceship extends Renderer {
  renderer: Renderer
  transform: Transform
  position: IPosition
  halfWidth: number = 0
  halfHeight: number = 0
  color: string = getRandomRGBAColor()
  strokeWidth: number = 1
  pathToDraw: Array<Point> = []
  path: Array<Point> = [
    { x: 0, y: 0 },
    { x: 1.5, y: 0.5 },
    { x: 0, y: 1 },
  ]

  onAwake(): void {
    this.renderer = this.getComponent(Renderer)
    this.transform = this.getComponent(Transform)
    this.renderer.draw = this.draw.bind(this)
    this.halfWidth = this.transform.scale.x / 2
    this.halfHeight = this.transform.scale.y / 2
    this.updatePath()
  }

  update(): void {}

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.strokeWidth
    this.drawPath(ctx, this.pathToDraw, { x, y })
    ctx.stroke()
  }

  updatePath(): void {
    this.pathToDraw = this.path.map((point: Point) => ({
      x: point.x * this.transform.scale.x,
      y: point.y * this.transform.scale.y,
    }))
  }
}
