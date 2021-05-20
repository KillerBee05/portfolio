import { useState, useEffect } from 'react'
// Material UI
import { Modal, Grid, makeStyles,TextField } from '@material-ui/core'
// Imported Components
import AddButton from '../components/AddButton'
// Loading Spinner
import MoonLoader from "react-spinners/MoonLoader"
import { css } from "@emotion/core"
// router
import { BrowserRouter as Router, Route, Switch, Link, useHistory, useParams } from 'react-router-dom'

// Project Grid Stlyes
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "75%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mainDiv: {
    backgroundColor: '#fff'
  },
  button: {
    display: 'block',
    margin: '0 auto'
  },
  topSpace: {
    padding: '1em'
  },
  socials: {
    float: "right",
    width: "25%",
    marginLeft: "75%"
  }
}));
const Account = () => {
  const classes = useStyles();

  return(
    <div>

      <form noValidate autoComplete="off" className={classes.topSpace}>
        <h1 className={classes.topSpace}> Welcome to your portfolio account profile! </h1>
        <Grid container spacing={24} >
          <Grid className={classes.socials}>
            <TextField id="standard-basic" label="Standard" fullWidth />
          </Grid>
        </Grid>
        <Grid container spacing={24} >
          <Grid className={classes.socials} >
            <TextField id="standard-basic" label="Standard" fullWidth />
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid className={classes.socials} >
            <TextField id="standard-basic" label="Standard" fullWidth />
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default Account
