import { useState, useEffect } from 'react'
// Material UI
import { Modal, Grid, makeStyles,TextField } from '@material-ui/core'
// Imported Components
import Header from '../components/Header'
import Account from '../components/Account'
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
    marginTop: "2em",
    backgroundColor: "#fff",
    height:"800px"
  },
  button: {
    display: 'block',
    margin: '0 auto'
  }
}));
const AccountGrid = () => {
  const classes = useStyles();

  return(
    <div>
      <Header />
      <div className={classes.mainDiv}>
        <Account />
      </div>
    </div>
  )
}

export default AccountGrid
