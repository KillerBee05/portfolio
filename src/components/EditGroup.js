import { useState, useEffect } from 'react'
import { TextField, Grid } from '@material-ui/core'
import AddButton from './AddButton'
import { makeStyles } from '@material-ui/core/styles'

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

// Edit skill group component
const EditGroup = ({ onEdit, groupData }) => {
  const classes = useStyles();
  const [group, setGroup] = useState(groupData.group)
  const [skills, setSkills] = useState(groupData.skills)

  // Send data to api call in the SkillGrid component
  // TODO find a way to just upate group name
  const updateGroup = (e) => {
    e.preventDefault()
    const id = groupData.id
    onEdit({id, group, skills})
    setGroup('')
  }

  return(
    <div>
      <form onSubmit={updateGroup}>
        <Grid container spacing={4} justify="center" className={classes.gridSpace}>
          <TextField id="standard-basic" label="Edit Group" defaultValue={groupData.group} className={classes.textField} required onChange={(e) => setGroup(e.target.value)} />

          <AddButton type={true} addSkill={true} style={{marginLeft: "25%"}}/>
        </Grid>
      </form>
    </div>
  )
}

export default EditGroup
