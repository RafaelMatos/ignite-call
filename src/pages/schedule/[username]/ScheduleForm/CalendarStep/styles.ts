import { skeletonAnimation } from '@/styles/global'
import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 288px',

        '@media(max-width:900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'scroll',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,
  '@media(max-width:900px)': {
    backgroundColor: '$gray800',
    borderRadius: '$sm',
  },
})
export const TimePickerHeader = styled(Text, {
  textTransform: 'capitalize',
  fontWeight: '$medium',
  span: {
    color: '$gray200',
  },
})

export const CloseTimePicker = styled('button', {
  all: 'unset',
  display: 'none',
  position: 'absolute',
  backgroundColor: 'transparent',
  top: '0.5rem',
  right: '0.5rem',
  transition: '0.5s',

  '&:hover': {
    scale: '1.1',
    color: '$gray300',
  },

  '@media(max-width:900px)': {
    display: 'block',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
  '@media(max-width:900px)': {
    gridTemplateColumns: '2fr',
  },
})
export const TimePickerItem = styled('button', {
  border: 0,
  backgroundColor: '$gray600',
  padding: '$2 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },
  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})

export const SkeletonTimePickerItem = styled('div', {
  animation: `${skeletonAnimation} 1300ms ease-in-out infinite`,
  backgroundColor: '$ignite600',
  backgroundImage: 'linear-gradient(90deg, $gray800,$gray700,$gray800)',
  display: 'flex',
  backgroundSize: '200px 100%',
  padding: '$4 $4',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',
})
