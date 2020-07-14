export const getRandomColor = (): number => Math.floor(Math.random() * 255) + 1
export const getRandomRGBAColor = (): string => `rgba(${getRandomColor()},${getRandomColor()},${getRandomColor()},255)`
