import { useState, useEffect } from 'react'
import {TextField} from '@material-ui/core'
import AddButton from './AddButton'
import { Grid } from '@material-ui/core'

const AddSkill = ({ onAdd, groupId, groups }) => {
  const [skills, setSkills] = useState('')

  const addSkill = (e) => {
    e.preventDefault()
    let id = groupId
    let array = []
    let filteredRecord = groups.filter(group => groupId === group.id)
    let skillArray = filteredRecord.map((group) => {
      if(group.skills.length > 0){
        return group.skills
      }
      else {
        return array
      }
    })
    let newSkills = []
    if(skillArray[0].length > 0){
      newSkills = [...skillArray[0], skills]
    }
    else {
      newSkills = [skills]
    }
    onAdd({ id, group:filteredRecord[0].group, skills:newSkills })
    setSkills('')
  }

  return(
    <div>
      <form onSubmit={addSkill}>
        <Grid container spacing={4} justify="center" style={{ marginBottom:15}}>
           <TextField id="standard-basic" label="Add Skill" style={{width:"75%", marginTop:20}} value={skills} required onChange={(e) => setSkills(e.target.value)} />

           <AddButton type={true} addSkill={true} style={{marginTop:35}}/>
        </Grid>
      </form>
    </div>
  )
}

export default AddSkill
