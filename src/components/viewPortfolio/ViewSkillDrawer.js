import React from 'react'
// Material UI
import { Drawer, makeStyles } from '@material-ui/core'
// Imported Components
import ViewGroups from './viewPortfolioData/ViewGroups'
import ViewSkillList from './ViewSkillList'

// Skill Drawer styles
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    height: "50%",
    backgroundColor: '#66beb2',
  }
}));
// Skill Drawer component
const ViewSkillDrawer = ({ setOpen, open }) => {
  const classes = useStyles();
  return(
    <Drawer
        variant="persistent"
        anchor="bottom"
        open={open}
        onClick={setOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
      <ViewSkillList />
    </Drawer>
  )
}

export default ViewSkillDrawer
