import { useState } from 'react'
import { TextField } from '@material-ui/core'
import AddButton from './AddButton'
import ProgressBar from './ProgressBar'
import moment from "moment"

// Add infoCard component
const AddInfoCard = ({ onAdd }) => {
  const [infoCardTitle, setInfoCardTitle] = useState('')
  const [description, setDescription] = useState('')

  // Sends infoCard data to api call in the InfoCardGrid component
  const addInfoCard = (e) => {
    e.preventDefault()
    const createdAt = moment().format("MMMM Do YYYY")

    onAdd({ infoCardTitle, description, createdAt })
  }

  return(
     <div>
       <form>
         <TextField id="standard-basic" value={infoCardTitle} label="InfoCard Title" fullWidth onChange={(e) => setInfoCardTitle(e.target.value)} />

         <TextField id="standard-basic" label="Description" value={description} multiline rows={2} rowsMax={4} fullWidth  onChange={(e) => setDescription(e.target.value)} />

         <AddButton onClick={addInfoCard} upload={true} style={{marginLeft: "90%", marginTop: 20}} />
       </form>
     </div>
  )
}

export default AddInfoCard
