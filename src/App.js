import React from 'react'
import Header from './components/Header'
import ProjectGrid from './components/ProjectGrid'
import Introduction from './components/Introduction'
import Skills from './components/Skills'

function App() {
  return (
    <div className="App">
      <Header />
      <ProjectGrid />
      <Introduction />
      <Skills />
    </div>
  );
}

export default App;
