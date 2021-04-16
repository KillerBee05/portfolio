import React from 'react'
import Header from './components/Header'
import ProjectGrid from './components/ProjectGrid'
import Introduction from './components/Introduction'
import SkillDrawer from './components/SkillDrawer'
import SkillList from './components/SkillList'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

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
    <div>
      <MuiThemeProvider theme={theme}>
        <Header />
        <ProjectGrid />
        <Introduction />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
