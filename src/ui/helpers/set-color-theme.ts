export const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

export const setColorTheme = (): void => {
  document.body.classList.add('dark-mode')
}
