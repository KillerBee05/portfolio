import { useState, useEffect } from 'react'
// Components

import ProjectGrid from './ProjectGrid'
import Introduction from './Introduction'
import SkillDrawer from './SkillDrawer'
import SkillList from './SkillList'
import InfoCardGrid from './InfoCardGrid'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom'

const MyPortfolio = () => {
  // I dont think we need the logged in status since we're using 2 different components to display portfolio
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const getSession = async () => {
      const sessionDetails = await fetchSessionDetails()
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

    if(response.status !== 200){
      // Call log user out
      logUserOut()
      history.push("/signIn")
      alert('logged out')
    }
  }

  // log user out
  const logUserOut = () => {
    // clear local storage token & route user to sign in
    localStorage.setItem("token", '')
    localStorage.setItem("userId", '')
  }

  return(
    <div>
      <InfoCardGrid />
      <Introduction />
      <ProjectGrid />
    </div>
  )
}

export default MyPortfolio
