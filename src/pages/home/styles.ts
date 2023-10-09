import { Heading, Text, styled } from '@ignite-ui/react'
import imgBg from './../../assets/gridMask.png'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',

  '@media(max-width:600px)': {
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',
  backgroundImage: `url(${imgBg.src})`,
  backgroundSize: 'cover',
  [`> ${Heading}`]: {
    '@media(max-width:600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width:600px)': {
    objectFit: 'fill',
  },
})
