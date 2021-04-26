import { useState } from 'react'
import { TextField } from '@material-ui/core'
import AddButton from './AddButton'

// Edit infoCard component
const EditInfoCard = ({infoCardData, onUpdate}) => {
  const [infoCardTitle, setInfoCardTitle] = useState(infoCardData.infoCardTitle)
  const [description, setDescription] = useState(infoCardData.description)
  const [createdAt, setCreatedAt] = useState(infoCardData.createdAt)

  // Sends infoCard data to api call in the InfoCardGrid component
  const updateInfoCard = (e) => {
    e.preventDefault()
    const id = infoCardData.id

    onUpdate({id, infoCardTitle, description, createdAt})
  }

  // TODO fix save button and submit form
  return(
    <form>
      <TextField id="standard-basic" defaultValue={infoCardData.infoCardTitle} label="InfoCard Title" fullWidth onChange={(e) => setInfoCardTitle(e.target.value)} />

      <TextField id="standard-basic" label="Description" defaultValue={infoCardData.description} multiline rows={2} rowsMax={4} fullWidth  onChange={(e) => setDescription(e.target.value)} />

      <AddButton onClick={updateInfoCard} upload={true} style={{marginLeft: "90%", marginTop: 20}} />
    </form>
  )
}

export default EditInfoCard
