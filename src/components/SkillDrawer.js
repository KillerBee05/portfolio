import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import GroupList from './GroupList'
import SkillList from './SkillList'

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    height: 500,
    backgroundColor: '#8ad6cc'
  }
}));

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
