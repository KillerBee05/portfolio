import React from 'react'
import Header from './components/Header'
import ProjectGrid from './components/ProjectGrid'
import Introduction from './components/Introduction'
import SkillDrawer from './components/SkillDrawer'
import SkillList from './components/SkillList'
import "./styles/backgroundImg.css"

function App() {
  return (
    <div>
      <Header />
      <ProjectGrid />
      <Introduction />
    </div>
  );
}

export default App;
