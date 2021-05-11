import { useState, useEffect } from 'react'
// Material UI
import { Grid, Modal, Divider, makeStyles } from '@material-ui/core'
// Imported Components
import ViewGroups from './viewPortfolioData/ViewGroups'

import { BrowserRouter as Router, Route, Switch, Link, useHistory, useParams } from 'react-router-dom'

// Skill List styles
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "75%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

// Skill List component
const ViewSkillList = () => {
  const classes = useStyles();
  const [groups, setGroups] = useState([])
  const [groupSelected, setGroupSelected] = useState('')
  const { id } = useParams()
  // Get group data when component renders
  useEffect(() => {
    const getGroups = async () => {
      const groupData = await fetchGroups()
      setGroups(groupData)
    }
    getGroups()
  }, [])

  // Fetch group data
  const fetchGroups = async () => {
    const response = await fetch(`http://localhost:5001/portfolio-7ed56/us-central1/groupApi?${id}`)
    const data = await response.json()
    return data
  }

  return(
    <div style={{marginTop: "2em"}}>
      <Grid container justify="center" >
        {groups.length > 0 ? <ViewGroups groups={groups} /> : <p style={{textAlign: "center"}}>No skills at the moment</p>}
      </Grid>
    </div>
  )
}

export default ViewSkillList
