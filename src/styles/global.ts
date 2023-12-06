import { globalCss, keyframes, styled } from '@ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },
  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '--webkit-font-smoothing': 'antialiased',
  },

  /* Chrome, Edge, and Safari */
  ' *::-webkit-scrollbar': {
    width: '6px',
  },

  '*::-webkit-scrollbar-track': {
    background: 'transparent',
    ' border-radius': '5px',
  },

  '*::-webkit-scrollbar-thumb': {
    'background-color': '$ignite500',
    'border-radius': '14px',
    opacity: '0.5',
  },
})

export const skeletonAnimation = keyframes({
  '0%': {
    backgroundPosition: '-200px 0',
  },
  '100%': {
    backgroundPosition: 'calc(200px + 100%) 0',
  },
})
