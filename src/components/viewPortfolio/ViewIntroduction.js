import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import debounce from 'lodash/debounce'

// Introduction Styles
const useStyles = makeStyles((theme) => ({
  color: {
    backgroundColor: '#fff'
  }
}));

// Introduction component
const ViewIntroduction = () => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty())


  // Gets introduction data when component renders
  useEffect(() => {
    const getIntroduction = async () => {
      const introductionData = await fetchIntroduction()
      // if theres data convert it
      if(introductionData){
        setEditorState(EditorState.createWithContent(convertFromRaw(introductionData.introduction.content)))
      }
    }
    getIntroduction()
  }, [])

  // Fetch introduction data
  const fetchIntroduction = async () => {
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/introApi')
    const data = await response.json()
    return data
  }

  return(
    <div className={classes.color} style={{paddingTop: "2em"}} >
      <Editor
        editorState={editorState}
        toolbarHidden={true}
        readOnly={true}
      />
    </div>
  )
}

export default ViewIntroduction
