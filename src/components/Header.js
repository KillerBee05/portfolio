import { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import Link from '@material-ui/core/Link'
import"../styles/header.css"
import { withStyles, makeStyles } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import SkillDrawer from './SkillDrawer'
import { purple, blue, pink, green, red } from '@material-ui/core/colors';
import SkillList from './SkillList'
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: '#f99192'
  },
  icons: {
    color: '#000'
  },
  rightToolbar: {
    marginLeft: "auto",
    paddingTop: "1em"
  },
  socialPadding: {
    paddingLeft: "1em"
  },
  header: {
    color: '#000'
  }
}));

const PurpleSwitch = withStyles({
  switchBase: {
    color: red[300],
    '&$checked': {
      color: red[500],
    },
    '&$checked + $track': {
      backgroundColor: red[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const Header = () => {
  const [showSkills, setShowSkills] = useState(false)
  const [open, setOpen] = useState(false)
  const classes = useStyles();

  const handleChange = () => {
    setShowSkills(!showSkills)
    if(showSkills){
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  return(
    <AppBar position="static" className={classes.background}>
      <Toolbar>
        <Typography variant="h5" className={classes.header}>
            Evan's Portfolio
        </Typography>

        <section className={classes.rightToolbar}>
            <FormControlLabel
              value="top"
              control={<PurpleSwitch checked={showSkills} onChange={handleChange} name="showSkills" />}
              label="Skills"
              labelPlacement="bottom"
              style={{color:"black"}}
            />
          <Link className={classes.icons} href="https://www.linkedin.com/in/evan-herring-7019a975/" target="_blank">
            <LinkedInIcon />
          </Link>
          <Link className={classes.icons}  href="https://github.com/KillerBee05" target="_blank">
            <GitHubIcon className={classes.socialPadding}/>
          </Link>
        </section>
      </Toolbar>
      <SkillDrawer switch={handleChange} open={open}/>
    </AppBar>
  )
}

export default Header
