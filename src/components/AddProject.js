import { useState } from 'react'
// Material UI
import { TextField } from '@material-ui/core'
// Imported Components
import AddButton from './AddButton'
import ProgressBar from './ProgressBar'
import moment from "moment"
// Sweet alerts
import Swal from 'sweetalert2'

// Add project component
const AddProject = ({ onAdd, userId }) => {
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('')

  // Setting acceptable image types
  const types = ['image/png', 'image/jpeg']

  // Sends project data to api call in the ProjectGrid component
  const addProject = (e) => {
    e.preventDefault()
    const createdAt = moment().format("MMMM Do YYYY")

    onAdd({ userId, projectName, url, description, createdAt, link })
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Project added!'
    })
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
  // Need to make fields required
  return(
     <div>
       <form>
         <TextField id="standard-basic" value={projectName} label="Project Name" fullWidth onChange={(e) => setProjectName(e.target.value)} />

         <TextField id="fileToUpload" label="Image" fullWidth type="file" onChange={imageHandler}/>
         <span>
          { error && <div> { error } </div> }
          { image && <div> { image.name } </div> }
         </span>
          { image && <ProgressBar file={image} setFile={setImage} setUrl={setUrl}/>}

         <TextField id="standard-basic" label="Description" value={description} fullWidth  onChange={(e) => setDescription(e.target.value)} />

         <TextField id="standard-basic" label="Link" value={link} fullWidth onChange={(e) => setLink(e.target.value)} />

         <AddButton onClick={addProject} upload={true} style={{marginLeft: "90%", marginTop: 20}} />
       </form>
     </div>
  )
}

export default AddProject
