import {useState} from 'react'
import {TextField} from '@material-ui/core'
import AddButton from './AddButton'


const AddProject = ({onAdd, editFlag, projectData, onUpdate}) => {
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [time, setTime] = useState ('')
  const [link, setLink] = useState('')

  const addProject = (e) => {
    e.preventDefault()

    onAdd({projectName, image, description, time, link})
  }

  const updateProject = (e) => {
    e.preventDefault()
    
    const id = projectData.id
    onUpdate({id, projectName, image, description, time, link})
  }


  return(
     <div>
     {editFlag === false ?
       <form>
         <TextField id="standard-basic" value={projectName} label="Project Name" fullWidth onChange={(e) => setProjectName(e.target.value)} />

         <TextField id="fileToUpload" label="Image" fullWidth type="file" />

         <TextField id="standard-basic" label="Description" value={description} fullWidth  onChange={(e) => setDescription(e.target.value)} />

         <TextField id="standard-basic" label="Time added" value={time} onChange={(e) => setTime(e.target.value)} />

         <TextField id="standard-basic" label="Link" value={link} onChange={(e) => setLink(e.target.value)} />

         <AddButton onClick={addProject} upload={true} style={{marginLeft: 300, marginTop: 50}} />
       </form>
     :
       <form>
         <TextField id="standard-basic" value={projectName} label="Project Name" fullWidth onChange={(e) => setProjectName(e.target.value)} />

         <TextField id="fileToUpload" label="Image" fullWidth type="file" />

         <TextField id="standard-basic" label="Description" value={description} fullWidth  onChange={(e) => setDescription(e.target.value)} />

         <TextField id="standard-basic" label="Time added" value={time} onChange={(e) => setTime(e.target.value)} />

         <TextField id="standard-basic" label="Link" value={link} onChange={(e) => setLink(e.target.value)} />

         <AddButton onClick={updateProject} upload={true} style={{marginLeft: 300, marginTop: 50}} />
       </form>
    }
     </div>
  )
}

export default AddProject
