import { useState, useEffect } from 'react'
import {TextField} from '@material-ui/core'
import AddButton from './AddButton'
import { Grid } from '@material-ui/core'

const EditGroup = ({onEdit, groupData}) => {
  const [group, setGroup] = useState(groupData.group)
  const [skills, setSkills] = useState(groupData.skills)

  const updateGroup = (e) => {
    e.preventDefault()
    const id = groupData.id
    onEdit({id, group, skills})
    setGroup('')
  }

  return(
    <div >
      <form onSubmit={updateGroup}>
        <Grid container spacing={4} justify="center" style={{ marginTop:15, marginBottom:15}}>
          <TextField id="standard-basic" label="Edit Group" defaultValue={groupData.group} style={{width:"75%"}} required onChange={(e) => setGroup(e.target.value)} />

          <AddButton type={true} addSkill={true} />
        </Grid>
      </form>
    </div>
  )
}

export default EditGroup
