import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import Link from '@material-ui/core/Link'
import"../styles/header.css"

const Header = () => {
  return(
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton edge="start"  color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Evan's Portfolio
        </Typography>
        <section className="rightToolbar">
          <Link color="inherit" href="https://www.linkedin.com/in/evan-herring-7019a975/" target="_blank">
            <LinkedInIcon />
          </Link>
          <Link color="inherit"  href="https://github.com/KillerBee05" target="_blank">
            <GitHubIcon className="socialPadding"/>
          </Link>
        </section>
      </Toolbar>
    </AppBar>
  )
}

export default Header
