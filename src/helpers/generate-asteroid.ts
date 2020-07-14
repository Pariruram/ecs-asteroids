export type Point = {
  x: number
  y: number
}

const deg2rad = (degrees: number): number => degrees * (Math.PI / 180)
const random = (min: number, max: number): number => Math.random() * (max - min) + min

export const generateAsteroid = (radius: number): Array<Point> => {
  const vector: Point = { x: radius, y: radius }
  const points: Array<Point> = [{ ...vector }]
  let angle: number = 0

  while (angle < Math.PI * 1.5) {
    const theta: number = deg2rad(random(45, 80))
    const cos: number = Math.cos(theta)
    const sin: number = Math.sin(theta)
    const px: number = vector.x * cos - vector.y * sin
    const py: number = vector.x * sin + vector.y * cos
    points.push({
      x: px,
      y: py,
    })
    vector.x = px
    vector.y = py
    angle += theta
  }

  points.forEach((item, index, array): boolean => {
    // eslint-disable-next-line
    array[index] = { x: item.x + radius, y: item.y + radius }
    return true
  })

  return points
}
