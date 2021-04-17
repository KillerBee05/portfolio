import { useState } from 'react'
import { TextField, Grid } from '@material-ui/core'
import AddButton from './AddButton'
import { makeStyles } from '@material-ui/core/styles'
import moment from "moment"

// Style grid and textField
const useStyles = makeStyles((theme) => ({
  gridSpace: {
    marginTop:15,
    marginBottom:15
  },
  textField :{
    width:"75%"
  }
}));

// Add skill group component
const AddGroup = ({ onAdd }) => {
  const classes = useStyles();
  const [group, setGroup] = useState('')
  const [skills, setSkills] = useState([])
  // Send data to api call from the SkillGrid component
  const addGroup = (e) => {
    // Order by created time
    const createdAt = moment().format("MMMM Do YYYY")
    e.preventDefault()
    onAdd({ group, skills, createdAt})
    setGroup('')
  }
  // TODO give proder around to seperate fields
  return(
    <div >
      <form onSubmit={addGroup}>
        <Grid container spacing={4} justify="center" className={classes.gridSpace}>
          <TextField id="standard-basic" label="Add Group" value={group} className={classes.textField} required onChange={(e) => setGroup(e.target.value)} />

          <AddButton type={true} addSkill={true} />
        </Grid>
      </form>
    </div>
  )
}

export default AddGroup
