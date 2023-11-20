import { Box, Text, styled } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray400',
})

export const CountCharacter = styled(Text, {
  alignSelf: 'flex-end',
  marginRight: '$4',

  variants: {
    isMaxCharacters: {
      true: {
        color: '#f75a68',
      },
      false: {
        color: '$gray400',
      },
    },
  },
})
