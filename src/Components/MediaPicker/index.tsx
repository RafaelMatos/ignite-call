import { Avatar } from '@ignite-ui/react'
import { ChangeEvent } from 'react'
import { Input } from './styles'
import { useMediaPicker } from '@/hooks/useMediaPicker'

type MediaPickerProps = {
  urlAvatar?: string
}

export function MediaPicker({ urlAvatar }: MediaPickerProps) {
  const { preview, handleSetPreview, handleSetFileToUpload } = useMediaPicker()
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return
    }
    const previewURL = URL.createObjectURL(files[0])
    handleSetFileToUpload(files[0])
    handleSetPreview(previewURL)
  }
  return (
    <>
      <Input
        id="media"
        name="coverUrl"
        type="file"
        accept="image/*"
        onChange={onFileSelected}
        className="invisible h-0 w-0"
      />

      <Avatar src={preview || urlAvatar} alt="" />
    </>
  )
}
