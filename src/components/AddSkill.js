import { useState, useEffect } from 'react'
import { Grid, TextField } from '@material-ui/core'
import AddButton from './AddButton'
import { makeStyles } from '@material-ui/core/styles'
// Sweet alerts
import Swal from 'sweetalert2'

// Style grid and textField
const useStyles = makeStyles((theme) => ({
  gridSpace: {
    marginTop:15,
    marginBottom:15
  },
  textField :{
    width:"75%",
    marginTop:20
  }
}));

// Add skill component
const AddSkill = ({ onAdd, groupId, groups }) => {
  const classes = useStyles();
  const [skills, setSkills] = useState('')
  // Send skill data to api call in the SkillGrid component
  const addSkill = (e) => {
    e.preventDefault()
    let id = groupId
    let newSkills = []
    // Get correct skill group by id to add skills to
    let filteredRecord = groups.filter(group => groupId === group.id)
    // Check to see if skills exist within group
    let skillArray = filteredRecord.map((group) => {
      if(group.skills.length > 0){
        // Return skill array
        return group.skills
      }
      else {
        // Return empty array
        return newSkills
      }
    })

    if(skillArray[0].length > 0){
      // Merge new and old array data
      newSkills = [...skillArray[0], skills]
    }
    else {
      // create new data
      newSkills = [skills]
    }
    // Send skill data to api call to SkillGrid component
    onAdd({ id, group:filteredRecord[0].group, skills:newSkills })
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
      title: 'Skill added!'
    })

    setSkills('')
  }

  return(
    <div>
      <form onSubmit={addSkill}>
        <Grid container spacing={4} justify="center" className={classes.gridSpace}>
           <TextField id="standard-basic" label="Add Skill" className={classes.textField} value={skills} required onChange={(e) => setSkills(e.target.value)} />

           <AddButton type={true} addSkill={true} style={{marginLeft: "25%", marginTop: 30}}/>
        </Grid>
      </form>
    </div>
  )
}

export default AddSkill
