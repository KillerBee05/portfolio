import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Link, Switch, FormControlLabel, Drawer, makeStyles, withStyles } from '@material-ui/core'
import SkillDrawer from './SkillDrawer'
import SkillList from './SkillList'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import { purple, blue, pink, green, red } from '@material-ui/core/colors'

// Header Styles
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
  blackText: {
    color: '#000'
  }
}));

// Toggle switch style
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

// Header component
const Header = () => {
  const [showSkills, setShowSkills] = useState(false)
  const [open, setOpen] = useState(false)
  const classes = useStyles();

  // Show skill drawer
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
        <Typography variant="h5" className={classes.blackText}>
            Portfolio
        </Typography>

        <section className={classes.rightToolbar}>
            <FormControlLabel
              value="top"
              control={<PurpleSwitch checked={showSkills} onChange={handleChange} name="showSkills" />}
              label="Skills"
              labelPlacement="bottom"
              className={classes.blackText}
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
