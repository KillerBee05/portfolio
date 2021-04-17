import { useState } from 'react'
import { TextField } from '@material-ui/core'
import AddButton from './AddButton'
import ProgressBar from './ProgressBar'

// Edit project component
const EditProject = ({projectData, onUpdate}) => {
  const [projectName, setProjectName] = useState(projectData.projectName)
  const [description, setDescription] = useState(projectData.description)
  const [image, setImage] = useState(projectData.image)
  const [link, setLink] = useState(projectData.link)
  const [createdAt, setCreatedAt] = useState(projectData.createdAt)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(projectData.url)

  // Setting acceptable image types
  const types = ['image/png', 'image/jpeg']

  // Sends project data to api call in the ProjectGrid component
  const updateProject = (e) => {
    e.preventDefault()
    const id = projectData.id
    if(image){
      setUrl(url)
    }

    onUpdate({id, projectName, image, description, createdAt, url, link})
  }

  // Checks & verifies images being uploaded
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
  // TODO Make fields required
  return(
    <form>
      <TextField id="standard-basic" defaultValue={projectData.projectName} label="Project Name" fullWidth onChange={(e) => setProjectName(e.target.value)} />

      <TextField id="fileToUpload" label="Image" fullWidth type="file" onChange={imageHandler}/>
      <span>
       { error && <div> { error } </div> }
       { image && <div> { image.name } </div> }
      </span>

      <TextField id="standard-basic" label="Description" defaultValue={projectData.description} fullWidth  onChange={(e) => setDescription(e.target.value)} />

      <TextField id="standard-basic" label="Link" defaultValue={projectData.link} onChange={(e) => setLink(e.target.value)} />

      { image && <ProgressBar file={image} setFile={setImage} setUrl={setUrl}/>}

      <AddButton onClick={updateProject} upload={true} style={{marginLeft: 300, marginTop: 50}} />
    </form>
  )
}

export default EditProject
