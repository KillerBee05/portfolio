import React from 'react'
// Material UI
import { Drawer, makeStyles } from '@material-ui/core'
// Imported Components
import Groups from './Groups'
import SkillList from './SkillList'

// Skill Drawer styles
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    height: "50%",
    backgroundColor: '#66beb2',
  }
}));
// Skill Drawer component
const SkillDrawer = ({ open }) => {
  const classes = useStyles();
  return(
    <Drawer
        variant="persistent"
        anchor="bottom"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
      <SkillList />
    </Drawer>
  )
}

export default SkillDrawer
