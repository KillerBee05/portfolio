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
// import

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
    })
    // Check user token
    if(response.status === 200){
      const data = true
      return data
    }
    else {
      // Call log user out
      logUserOut()
    }
  }

  // log user out
  const logUserOut = () => {
    debugger;
    // clear local storage token & route user to sign in
  }

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Header />
        <InfoCardGrid />
        <Introduction />
        <ProjectGrid />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
