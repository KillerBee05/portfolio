import { useState } from 'react'
import {TextField} from '@material-ui/core'
import AddButton from './AddButton'
import '../styles/search.css';
import { Grid } from '@material-ui/core'

const AddGroup = ({ onAdd }) => {
  const [group, setGroup] = useState('')
  const [skills, setSkills] = useState([])
  const addGroup = (e) => {
    e.preventDefault()
    onAdd({ group, skills})
    setGroup('')
  }

  return(
    <div >
      <form onSubmit={addGroup}>
        <Grid container spacing={4} justify="center" style={{ marginTop:15, marginBottom:15}}>
          <TextField id="standard-basic" label="Add Group" value={group} style={{width:"75%"}} required onChange={(e) => setGroup(e.target.value)} />

          <AddButton type={true} addSkill={true} />
        </Grid>
      </form>
    </div>
  )
}

export default AddGroup
