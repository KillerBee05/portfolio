import { useState, useEffect } from 'react'
import { TextField, Grid } from '@material-ui/core'
import AddButton from './AddButton'
import { makeStyles } from '@material-ui/core/styles'
import moment from "moment"
// Sweet alerts
import Swal from 'sweetalert2'

// Style grid and textField
const useStyles = makeStyles((theme) => ({
  textField :{
    marginTop:"3em",
    width:"75%"
  },
  mainDiv: {
    marginTop: "10em",
    margin: "auto",
    width: "500px",
    height: "450px",
    position: "relative",
    borderRadius: "5px",
    backgroundColor: '#fff'
  }
}));

const SignIn = () => {
  const classes = useStyles();

  return(
    <div className={classes.mainDiv} >
      <form>
        <h3 style={{textAlign:"center", paddingTop:"1em"}}> Sign In </h3>
        <Grid container justify="center">
          <TextField id="standard-basic" label="User Name" value='' className={classes.textField} required />

          <TextField id="standard-basic" label="Password" value='' className={classes.textField} required />


        </Grid>
        <AddButton type={true} addSkill={true} style={{marginLeft: "80%", marginTop:"25%"}}/>
      </form>
    </div>
  )
}

export default SignIn
