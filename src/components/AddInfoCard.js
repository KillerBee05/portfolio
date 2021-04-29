import { useState } from 'react'
import { TextField } from '@material-ui/core'
import AddButton from './AddButton'
import ProgressBar from './ProgressBar'
import moment from "moment"
// Sweet alerts
import Swal from 'sweetalert2'

// Add infoCard component
const AddInfoCard = ({ onAdd }) => {
  const [infoCardTitle, setInfoCardTitle] = useState('')
  const [description, setDescription] = useState('')

  // Sends infoCard data to api call in the InfoCardGrid component
  const addInfoCard = (e) => {
    e.preventDefault()
    const createdAt = moment().format("MMMM Do YYYY")

    onAdd({ infoCardTitle, description, createdAt })
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
      title: 'Info card added!'
    })
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
