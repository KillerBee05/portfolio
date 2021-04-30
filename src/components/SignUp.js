import { useState, useEffect } from 'react'
import { TextField, Grid } from '@material-ui/core'
import AddButton from './AddButton'
import { makeStyles } from '@material-ui/core/styles'

// Sweet alerts
import Swal from 'sweetalert2'

// test
const url = "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
// Style grid and textField
const useStyles = makeStyles((theme) => ({
  textField :{
    marginTop:"1em",
    width:"75%"
  },
  left: {
  width:  "220px",
  height:  "auto",
  minHeight: "100%",
  position: "relative",
  backgroundImage: url,
  backgroundSize:  "cover",
  borderTopLeftRadius:  "4px",
  borderBottomLeftRadius:  "4px",
    svg: {
      height:  "40px",
      width:  "auto",
      margin:  "20px"
    }
  }
}));

const SignUp = ({ signIn, handleSignUp }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = (e) => {
    e.preventDefault()
    debugger;
    handleSignUp({ email, password })
  }
  return(
    <div>
      <form onSubmit={signUp}>
        <h3 style={{textAlign:"center", paddingTop:"3em", marginBottom:"2em"}}> Sign Up </h3>
        <Grid container justify="center">
          <TextField id="standard-basic" label="Email"  variant="outlined" className={classes.textField} required  onChange={(e) => setEmail(e.target.value)}/>

          <TextField id="standard-basic" label="Password"  variant="outlined" className={classes.textField} required onChange={(e) => setPassword(e.target.value)}/>

          <TextField id="standard-basic" label="Confirm Password"  variant="outlined" className={classes.textField} required />
        </Grid>

        <Grid container style={{marginLeft: "3em", marginTop:"10%"}}>
          <AddButton upload={true} style={{marginRight: "20em"}}/>
          <AddButton type={true} addSkill={true} onClick={()=> signUp()}/>
        </Grid>
      </form>
    </div>
  )
}

export default SignUp
