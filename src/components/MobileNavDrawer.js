import { useState, useEffect } from 'react'
// Material UI
import { Drawer, makeStyles } from '@material-ui/core'
// Imported Components
// import Groups from './Groups'

// Skill Drawer styles
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    height: "100%",
    width: "20%",
    '@media (max-width: 1030px)' : {
      width: '30%',
    },
    '@media (max-width: 500px)' : {
      width: '50%',
    },
    '@media (max-width: 412px)' : {
      width: '60%',
    },
    backgroundColor: '#fff',
  }
}));

const MobileNavDrawer = ({ toggle, open }) => {
  const classes = useStyles();
  return(
    <div>
    <Drawer
        anchor="left"
        open={open}
        onClose={toggle}
        classes={{
          paper: classes.drawerPaper
        }}
      >
      <ul>
        <li>Profile</li>
        <li>Logout</li>
      </ul>
    </Drawer>
    </div>
  )
}

export default MobileNavDrawer
