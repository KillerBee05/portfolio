import {useEffect} from 'react'
import useStorage from '../hooks/useStorage'
//TDOD Use react syles within this component
import '../styles/projectgrid.css'

const ProgressBar = ({ file, setFile, setUrl }) => {
  const {url, progress} = useStorage(file)

  useEffect(() => {
    if(url){
      setFile(null)
      setUrl(url)
    }
  }, [url, setUrl, setFile])
  return(
    <div className="progress-bar" style={{ width: progress + '%' }}></div>
  )
}

export default ProgressBar
