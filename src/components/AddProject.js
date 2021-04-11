import {useState} from 'react'
import {TextField} from '@material-ui/core'
import AddButton from './AddButton'
import ProgressBar from './ProgressBar'
import moment from "moment";


const AddProject = ({onAdd}) => {
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('')

  const types = ['image/png', 'image/jpeg']

  const addProject = (e) => {
    e.preventDefault()
    const createdAt = moment().format("MMMM Do YYYY")

    onAdd({projectName, url, description, createdAt, link})
  }

  //TODO need to render only the progress bar. and not send the image until submit
  const imageHandler = (e) => {
    const selected = e.target.files[0]
    if(selected && types.includes(selected.type)){
      setImage(selected)
      setError(null)
    } else {
      setImage(null)
      setError('Please select an image file (png or jpeg)')
    }
  }

  return(
     <div>
       <form>
         <TextField id="standard-basic" value={projectName} label="Project Name" fullWidth onChange={(e) => setProjectName(e.target.value)} />

         <TextField id="fileToUpload" label="Image" fullWidth type="file" onChange={imageHandler}/>
         <span>
          { error && <div> { error } </div> }
          { image && <div> { image.name } </div> }
         </span>

         <TextField id="standard-basic" label="Description" value={description} fullWidth  onChange={(e) => setDescription(e.target.value)} />

         <TextField id="standard-basic" label="Link" value={link} fullWidth onChange={(e) => setLink(e.target.value)} />

          { image && <ProgressBar file={image} setFile={setImage} setUrl={setUrl}/>}

         <AddButton onClick={addProject} upload={true} style={{marginLeft: "90%", marginTop: 20}} />
       </form>
     </div>
  )
}

export default AddProject
