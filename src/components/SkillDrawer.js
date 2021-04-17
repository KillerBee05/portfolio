import React from 'react'
// Material UI
import { Drawer, makeStyles } from '@material-ui/core'
// Imported Components
import Groups from './Groups'
import SkillList from './SkillList'

// Skill Drawer styles
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    height: 500,
    backgroundColor: '#8ad6cc'
  }
}));
// Skill Drawer component
const SkillDrawer = ({ setOpen, open }) => {
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
      <SkillList />
    </Drawer>
  )
}

export default SkillDrawer
