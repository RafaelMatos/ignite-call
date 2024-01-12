import { cloud } from '@/lib/axios'
import { ReactNode, createContext, useState } from 'react'

interface MediaPickerContextData {
  preview: string | null
  newImageUrl: string | null
  fileToUpload: File | null
  handleSetPreview: (urlPreview: string) => void
  handleSetFileToUpload: (file: File) => void
  handleSetNewImageUrl: (imageUrl: string) => void
  // handleImageUpload: (file: File) => void
}

interface MediaPickerProps {
  children: ReactNode
}

export const MediaPickerContext = createContext({} as MediaPickerContextData)

export function MediaPickerContextProvider({ children }: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null)

  function handleSetPreview(urlPreview: string) {
    setPreview(urlPreview)
  }
  function handleSetFileToUpload(fileList: File) {
    setFileToUpload(fileList)
  }
  function handleSetNewImageUrl(imageUrl: string) {
    setNewImageUrl(imageUrl)
  }

  return (
    <MediaPickerContext.Provider
      value={{
        preview,
        handleSetPreview,
        handleSetFileToUpload,
        fileToUpload,
        newImageUrl,
        handleSetNewImageUrl,

        // handleImageUpload,
      }}
    >
      {children}
    </MediaPickerContext.Provider>
  )
}
