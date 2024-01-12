import { MediaPickerContext } from '@/context/MediaPickerContext'
import { useContext } from 'react'

export function useMediaPicker() {
  return useContext(MediaPickerContext)
}
