import { useState, useEffect } from 'react'
// Components
import Header from '../Header'
import ViewProjectGrid from './ViewProjectGrid'
import ViewIntroductionGrid from './ViewIntroductionGrid'
import SkillDrawer from '../SkillDrawer'
import SkillList from '../SkillList'
import ViewInfoCardGrid from './ViewInfoCardGrid'
import ViewHeader from './ViewHeader'

const ViewPortfolioProfile = () => {
  // const [viewPortfolio, setViewPortfolio] = useState(true)
  // passing data through url
  // useParams()

  return(
    <div>
      <ViewHeader />
      <ViewIntroductionGrid />
      <ViewInfoCardGrid />
      <ViewProjectGrid />
    </div>
  )
}

export default ViewPortfolioProfile
