import { useState ,useEffect } from 'react'
import Header from './components/Header'
import ProjectGrid from './components/ProjectGrid'
import Introduction from './components/Introduction'
import SkillDrawer from './components/SkillDrawer'
import SkillList from './components/SkillList'
import InfoCardGrid from './components/InfoCardGrid'
import SignInGrid from './components/SignInGrid'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState(1)

  useEffect(() => {
    const getSession = async () => {
      const sessionDetails = await fetchSessionDetails()
      setLoggedIn(sessionDetails)
    }
    getSession()
  }, [])

  // Fetch session data
  // Look into refresh tokens
  const fetchSessionDetails = async () => {
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/authApi/sessionDetails', {
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      // body: JSON.stringify(infoCard)
    })
    debugger;
    // current user id
    const data = await response.json()
    if(response.status === 200){
      return true
    }
    else {
      // Call log user out
      logUserOut()
      alert('logged out')
    }
  }

  // log user out
  const logUserOut = () => {
    // clear local storage token & route user to sign in
    localStorage.setItem("token", '')
    console.log(localStorage)
  }

  return (
    <Router>
      <div>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path="/signIn">
              <Header />
              <InfoCardGrid />
              <Introduction />
              <ProjectGrid />
            </Route>
            <Route path="/">
              <SignInGrid />
            </Route>
          </Switch>
        </MuiThemeProvider>
      </div>
    </Router>
  );
}

export default App;
