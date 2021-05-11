import { useState } from 'react'
import { TextField } from '@material-ui/core'
import AddButton from './AddButton'
// Sweet alerts
import Swal from 'sweetalert2'

// Add infoCard component
const EditIntroduction = ({ introductionData, onUpdate, userId }) => {
  const [introduction, setIntroduction] = useState(introductionData.introduction)
  // Sends infoCard data to api call in the InfoCardGrid component
  const updateIntroduction = (e) => {
    e.preventDefault()
    const id = introductionData.id
    // May only need the userId on add. So we may be able to delete it here
    onUpdate({userId, id, introduction})
  }

  return(
     <div>
       <form>
         <TextField id="standard-basic" label="Tell me about yourself" value={introduction} multiline rows={2} rowsMax={4} fullWidth  onChange={(e) => setIntroduction(e.target.value)} />

         <AddButton onClick={updateIntroduction} upload={true} style={{marginLeft: "90%", marginTop: 20}} />
       </form>
     </div>
  )
}

export default EditIntroduction
