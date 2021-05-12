import { useState ,useEffect } from 'react'
import Header from './components/Header'
import MyPortfolio from './components/MyPortfolio'
import ViewPortfolioProfile from './components/viewPortfolio/ViewPortfolioProfile'
import AccountGrid from './pages/AccountGrid'
import SignInGrid from './pages/SignInGrid'
import KanbanBoard from './components/KanbanBoard'
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
  return (
    <Router>
      <div>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact>
              <MyPortfolio />
            </Route>
            <Route path="/portfolio/:id" exact>
              <ViewPortfolioProfile />
            </Route>
            <Route path="/signIn">
              <SignInGrid />
            </Route>
            <Route path="/profile">
              <AccountGrid />
            </Route>
            <Route path="/kan">
              <KanbanBoard />
            </Route>

          </Switch>
        </MuiThemeProvider>
      </div>
    </Router>
  );
}

export default App;
