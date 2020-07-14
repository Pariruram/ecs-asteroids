import { Transform, IPosition, Renderer } from '@pariruram/ecs'
import { getRandomRGBAColor, Point, generateAsteroid } from 'helpers'

export class Asteroid extends Renderer {
  renderer: Renderer
  transform: Transform
  position: IPosition = { x: 0, y: 0, z: 0 }
  halfWidth = 0
  halfHeight = 0
  color: string = getRandomRGBAColor()
  strokeWidth = 1
  path: Array<Point> = generateAsteroid(1)
  pathToDraw: Array<Point> = generateAsteroid(1)

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
    this.pathToDraw = this.path.map((point) => ({
      x: (point.x * this.transform.scale.x) / 2,
      y: (point.y * this.transform.scale.y) / 2,
    }))
  }
}
