import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ViewIntroduction from './viewPortfolioData/ViewIntroduction'
// Loading Spinner
import MoonLoader from "react-spinners/MoonLoader"
import { css } from "@emotion/core"
// router
import { BrowserRouter as Router, Route, Switch, Link, useHistory, useParams } from 'react-router-dom'
// Introduction Styles
const useStyles = makeStyles((theme) => ({
    mainDiv: {
      marginTop: "3em",
      backgroundColor: '#fff'
    },
    button: {
      color: '#fff'
    },
    noInfoCards: {
      textAlign: "center",
      paddingTop: "3em"
    }
}));

// Can be a string as well. Need to ensure each key-value pair ends with ;
// Laoding spinner css overrides
const override = css`
  display: block;
  margin: 0 auto;
`;

// Introduction component
const ViewIntroductionGrid = () => {
  const classes = useStyles();
  const [introduction, setIntroduction] = useState()
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#f97171");
  const { id } = useParams()

  // Get infoCard data & set loading spinner to false
  useEffect(() => {
    const getIntroduction = async () => {
      const introductionData = await fetchIntroduction()
      setIntroduction(introductionData)
      setLoading(false)
    }
    getIntroduction()
  }, [])

  // Fetch introduction data
  const fetchIntroduction = async () => {
    const response = await fetch(`http://localhost:5001/portfolio-7ed56/us-central1/introApi?${id}`)
    const data = await response.json()
    return data
  }

  return(
    <div className={classes.mainDiv} >
      <div className={classes.button}>
        { loading === true ?
          "":
          introduction.length > 0 ? <ViewIntroduction introduction={introduction} /> : <p className={classes.noInfoCards}>No info about me at the moment</p>
        }
      </div>
    </div>
  )
}

export default ViewIntroductionGrid
