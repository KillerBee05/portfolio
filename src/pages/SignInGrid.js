import { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import AddButton from '../components/AddButton'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import { makeStyles } from '@material-ui/core/styles'
// Sweet alerts
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'


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
  const history = useHistory()

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
    if(response.status === 200){
      alert('You are now signed up!')
      setSignUp(false)
    }
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
    if(response.status === 200){
      // sweet alerts
      // also set time out inside local storage & refresh token
        alert('we signed in '+data.email)
        localStorage.setItem("token", data.idToken)
        fetchSessionDetails()
    }
    else {
      alert(data.error.message)
    }
  }

  // Fetch session data
  // Look into refresh tokens
  const fetchSessionDetails = async () => {
    debugger;
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/authApi/sessionDetails', {
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })

    if(response.status === 200){
      // data has current user id and other info
      const data = await response.json()
      // Id like to store this in state rather than local storage
      localStorage.setItem("userId", data.userId)

      history.push("/")
      // return data
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
