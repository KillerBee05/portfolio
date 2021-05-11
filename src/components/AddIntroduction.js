import { useState } from 'react'
import { TextField } from '@material-ui/core'
import AddButton from './AddButton'
import moment from "moment"
// Sweet alerts
import Swal from 'sweetalert2'

// Add infoCard component
const AddIntroduction = ({ onAdd, userId }) => {
  const [introduction, setIntroduction] = useState('')

  // Sends infoCard data to api call in the InfoCardGrid component
  const addIntroduction = (e) => {
    e.preventDefault()
    const createdAt = moment().format("MMMM Do YYYY")

    onAdd({ userId, introduction })
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
      title: 'Introduction added!'
    })
  }

  return(
     <div>
       <form>
         <TextField id="standard-basic" label="Tell me about yourself" value={introduction} multiline rows={2} rowsMax={4} fullWidth  onChange={(e) => setIntroduction(e.target.value)} />

         <AddButton onClick={addIntroduction} upload={true} style={{marginLeft: "90%", marginTop: 20}} />
       </form>
     </div>
  )
}

export default AddIntroduction
