import { useState, useEffect } from 'react'
// Components
import Header from '../Header'
import ViewProjectGrid from './ViewProjectGrid'
import ViewIntroduction from './ViewIntroduction'
import SkillDrawer from '../SkillDrawer'
import SkillList from '../SkillList'
import ViewInfoCardGrid from './ViewInfoCardGrid'

const ViewPortfolioProfile = () => {
  const [viewPortfolio, setViewPortfolio] = useState(true)
  // passing data through url
  // useParams()

  return(
    <div>
      <ViewInfoCardGrid />
      <ViewIntroduction />
      <ViewProjectGrid />
    </div>
  )
}

export default ViewPortfolioProfile
