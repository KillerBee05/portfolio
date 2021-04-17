import { useState, useEffect } from 'react'
import { Grid, TextField } from '@material-ui/core'
import AddButton from './AddButton'
import { makeStyles } from '@material-ui/core/styles'

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
    setSkills('')
  }

  return(
    <div>
      <form onSubmit={addSkill}>
        <Grid container spacing={4} justify="center" className={classes.gridSpace}>
           <TextField id="standard-basic" label="Add Skill" className={classes.textField} value={skills} required onChange={(e) => setSkills(e.target.value)} />

           <AddButton type={true} addSkill={true} style={{marginTop:35}}/>
        </Grid>
      </form>
    </div>
  )
}

export default AddSkill
