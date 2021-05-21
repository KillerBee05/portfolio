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
    paddingLeft:"10%",
    paddingRight:"10%"
  },
  header: {
    padding: '1em',
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
    marginLeft: "50%",
    width:"350px"
  }
}));
const Account = () => {
  const classes = useStyles();

  return(
    <div className={classes.mainDiv}>
      <form noValidate autoComplete="off" className={classes.topSpace}>
        <h1 className={classes.header}> Welcome to your portfolio account profile! </h1>

        <Grid>
          <Grid className={classes.socials}>
              <TextField  id="standard-basic" label="Github Link"  />
              <TextField  id="standard-basic" label="Github Link"  />
          </Grid>

        </Grid>
      </form>
    </div>
  )
}

export default Account
