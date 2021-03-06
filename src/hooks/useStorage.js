import { useState, useEffect } from 'react'
import { projectStorage } from '../firebase/config'

const useStorage = (image) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    // references
    debugger
    const storageRef = projectStorage.ref('images/' + image.name)
    if(image.type === 'application/pdf'){
      const storageRef = projectStorage.ref('PDFs/' + image.name)
    }

    storageRef.put(image).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
      setProgress(percentage)
    }, (err) => {
      setError(err)
    }, async () => {
      const url = await storageRef.getDownloadURL()
      setUrl(url)
    })
  }, [image])

  return { progress, url, error }
}

export default useStorage
