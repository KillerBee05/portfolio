import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import debounce from 'lodash/debounce'

const useStyles = makeStyles((theme) => ({
  color: {
    backgroundColor: '#fff'
  }
}));

const Introduction = () => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    const content = editorState.getCurrentContent()
    const fixData = convertToRaw(content)
    saveIntroduction(fixData)
    setEditorState(editorState)
  };

  useEffect(() => {
    const getIntroduction = async () => {
      const introductionData = await fetchIntroduction()
      if(introductionData){
        setEditorState(EditorState.createWithContent(convertFromRaw(introductionData.introduction.content)))
      }
    }
    getIntroduction()
  }, [])

  const fetchIntroduction = async () => {
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/introApi')
    const data = await response.json()
    return data
  }

  const saveIntroduction = debounce(async (fixData) => {
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/introApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({content: fixData})
    })
    const data = await response.json()
  }, 5000)


  return(
    <div className={classes.color} style={{paddingTop: "2em"}} >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        toolbarHidden={false}
        readOnly={false}
        editorStyle={{paddingBottom: "20em"}}
      />
    </div>
  )
}

export default Introduction
