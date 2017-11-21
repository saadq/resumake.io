/**
 * @flow
 */

const colors = {
  primary: '#fff',
  accent: '#111',
  borders: '#222'
}

const sizes = {
  header: '15vh',
  sideNav: '20vw',
  progress: '15px',
  preview: Math.min(600, (document.body: any).clientWidth - 52)
}

const margins = {
  progress: '30px'
}

const styles = {
  gradient: `linear-gradient(to right, #050505, #080808, #050505)`
}

export { colors, sizes, margins, styles }
