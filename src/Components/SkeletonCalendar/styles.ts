import { skeletonAnimation } from '@/styles/global'
import { styled } from '@ignite-ui/react'

export const SkeletonCalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize: '$sm',
  },

  'tbody:before': {
    content: '.',
    lineHeight: '0.75rem',
    display: 'block',
    color: '$gray800',
  },
  'tbody td': {
    boxSizing: 'border-box',
  },
})

export const SkeletonCalendarDay = styled('div', {
  animation: `${skeletonAnimation} 1300ms ease-in-out infinite`,
  backgroundImage: 'linear-gradient(90deg, $gray800,$gray700,$gray800)',
  backgroundSize: '200px 100%',
  aspectRatio: '1/1',
  textAlign: 'center',
  cursor: 'default',
  borderRadius: '$sm',
})
