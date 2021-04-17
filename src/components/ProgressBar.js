import {useEffect} from 'react'
// Custom Hook
import useStorage from '../hooks/useStorage'
// Material UI
import { makeStyles } from '@material-ui/core/styles'

// Introduction Styles
const useStyles = makeStyles((theme) => ({
  progressBar: {
    height: "5px",
    background: "pink",
    marginTop: "20px"
  }
}));

// ProgressBar component
const ProgressBar = ({ file, setFile, setUrl }) => {
  const classes = useStyles();
  const {url, progress} = useStorage(file)
  // Sends image to storage
  useEffect(() => {
    if(url){
      setFile(null)
      setUrl(url)
    }
  }, [url, setUrl, setFile])

  return(
    <div className={classes.progressBar} style={{ width: progress + '%' }}></div>
  )
}

export default ProgressBar
