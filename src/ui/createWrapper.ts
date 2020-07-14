/* eslint-disable no-param-reassign */
import jss from 'jss'
import preset from 'jss-preset-default'
import { config } from '../config'

jss.setup(preset())
const { classes } = jss
  .createStyleSheet({
    wrapper: {
      position: 'absolute',
      width: config.canvasWidth,
      height: config.canvasHeight,
      bottom: 0,
      left: 0,
      userSelect: 'none',
    },
    fullWindow: {
      position: 'fixed',
      width: '100%',
      height: '100%',
    },
    fullscreen: {
      position: 'absolute',
      width: '16px',
      height: '16px',
      bottom: '10px',
      right: '10px',
      backgroundColor: 'transparent',
      backgroundImage:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAv0lEQVRYhe2XMQoCMRBFX2SP4C0ET2ApwtZewcbewiPY2lsIHkUtRMHGo6zNbvEtRNAlcTdiQGFe+TP584sJTFAcExqQNI/wKzpNhqmxAJlHOwH7QP2lhecRWAbOhkDvRfEMxqJFk4+QtLIhtAA/FyADpjXtnLDfhvszf1Al7GUYxp/gJM1q2sE5t03RTNII6D9Jpe0DFsAC+NbyXFI3UL92zu3eGUrKgXHgeOC7EIP9Db9OBlwj6tvscGWEZ3EDNxYpsSrbBuMAAAAASUVORK5CYII=)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '16px 16px',
      border: 'none',
      opacity: 0.5,
      zIndex: 1,
      transition: 'scale .1s',
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
        transform: 'scale(1.1)',
      },
    },
    fullscreenClose: {
      backgroundImage:
        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnElEQVRYhe2WMQ7CMAxFv1HPkamMnKED1+kVGThDR5h6kd+1Ev4BSqsM/Lfajp/kKDEgINnzlVHlr+rGpK5X+ad3Bx6NBSzQVW5o2bFPIZkLAHjs2EhxU4HmI7BAfPK8rrhHxFRLIHkBMPymZYz5J9o/RMkCWWPrUipp/hdYoANwFrGCyibzJVcAcyoQEc8soHa4jcyqT/MRWMACC/RvrCdjqIogAAAAAElFTkSuQmCC)',
    },
  })
  .attach()

export function createWrapper(): HTMLElement {
  const container = document.createElement('div')
  container.classList.add(classes.wrapper)
  const fullScreenButton = document.createElement('button')
  fullScreenButton.classList.add(classes.fullscreen)

  container.appendChild(fullScreenButton)
  document.body.appendChild(container)

  const handleToggleFullscreen = (isFullscreen?: boolean) => (): void => {
    isFullscreen = !isFullscreen
    fullScreenButton.blur()
    if (isFullscreen) {
      fullScreenButton.classList.add(classes.fullscreenClose)
      container.classList.add(classes.fullWindow)
      return
    }
    fullScreenButton.classList.remove(classes.fullscreenClose)
    container.classList.remove(classes.fullWindow)
  }

  fullScreenButton.addEventListener('click', handleToggleFullscreen())

  return container
}
