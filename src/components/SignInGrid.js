import { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import AddButton from './AddButton'
import SignIn from './SignIn'
import SignUp from './SignUp'
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
  mainDiv: {
    marginTop: "10em",
    margin: "auto",
    width: "500px",
    height: "450px",
    position: "relative",
    borderRadius: "5px",
    backgroundColor: '#fff'
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

const SignInGrid = () => {
  const classes = useStyles();
  const [signUp, setSignUp] = useState(false)

  // Sign up data
  const handleSignUp = async (user) => {
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/authApi/signUp', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user)
    })

    const data = await response.json()

    // add sweet alert here from respone data

    // Switch to sign in if success
    // if(response.status === 200){
    //   setSignUp(false)
    // }
  }

  const handleSignIn = async (user) => {
      // need to set API key to environment variable
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdd5SW1RgP0oct6-iWJMio0RQBSo3ko5Y', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user)
    })

    const data = await response.json()
    // let errorMessage = ''
    // console.log(data.error.message)
    // add sweet alert here from respone data
    if(response.status === 200){
      // sweet alerts
      debugger;
        alert('we signed in '+data.email)
        localStorage.setItem("token", data.idToken)
        // localStorage.setItem("userId", data.userId)
    }
    else {
      alert(data.error.message)
    }
  }

  const changeSignIn = () => {
    setSignUp(false)
  }

  const changeSignUp = () => {
    setSignUp(true)
  }


  return(
    <div className={classes.mainDiv}>
      { signUp === false
        ?
        <SignIn signUp={changeSignUp} handleSignIn={handleSignIn}/>
        :
        <SignUp signIn={changeSignIn} handleSignUp={handleSignUp}/>
      }
    </div>
  )
}

export default SignInGrid
