import { useState ,useEffect } from 'react'
import Header from './components/Header'
import MyPortfolio from './components/MyPortfolio'
import ViewPortfolioProfile from './components/viewPortfolio/ViewPortfolioProfile'
import SignInGrid from './pages/SignInGrid'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// React Router
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom'

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
  // useEffect(() => {
  //   debugger;
  //   alert("app")
  //   const getSession = async () => {
  //     const sessionDetails = await fetchSessionDetails()
  //   }
  //   getSession()
  // }, [])
  //
  // // Fetch session data
  // // Look into refresh tokens
  // const fetchSessionDetails = async () => {
  //   debugger;
  //   const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/authApi/sessionDetails', {
  //     method: 'GET',
  //     headers: {
  //       'authorization': 'Bearer ' + localStorage.getItem('token'),
  //     },
  //   })
  //
  //   if(response.status === 200){
  //     // data has current user id and other info
  //     const data = await response.json()
  //     // Id like to store this in state rather than local storage
  //     localStorage.setItem("userId", data.userId)
  //     return data
  //   }
  // }
  return (
    <Router>
      <div>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact>
              <Header />
              <MyPortfolio />
            </Route>
            <Route path="/portfolio/:id" exact>
              <Header />
              <ViewPortfolioProfile />
            </Route>
            <Route path="/signIn">
              <SignInGrid />
            </Route>
          </Switch>
        </MuiThemeProvider>
      </div>
    </Router>
  );
}

export default App;
