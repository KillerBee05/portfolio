import { useState, useEffect } from 'react'
// Material UI
import { Modal, Grid, makeStyles } from '@material-ui/core'
// Imported Components
import ViewInfoCards from './viewPortfolioData/ViewInfoCards'
// Loading Spinner
import MoonLoader from "react-spinners/MoonLoader"
import { css } from "@emotion/core"
// router
import { BrowserRouter as Router, Route, Switch, Link, useHistory, useParams } from 'react-router-dom'


// InfoCard Grid Stlyes Modal, Grid, makeStyles
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "75%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mainDiv: {
    marginTop: "3em",
    backgroundColor: '#fff'
  },
  button: {
    color: '#fff'
  },
  noInfoCards: {
    textAlign: "center",
    paddingTop: "5em"
  }
}));

// Can be a string as well. Need to ensure each key-value pair ends with ;
// Laoding spinner css overrides
const override = css`
  display: block;
  margin: 0 auto;
`;

// Info Card Component
const ViewInfoCardGrid = () => {
  const classes = useStyles();
  const [infoCards, setInfoCards] = useState([])
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#f97171");
  const { id } = useParams()

  // Get infoCard data & set loading spinner to false
  useEffect(() => {
    const getInfoCards = async () => {
      const infoCardData = await fetchInfoCards()
      setInfoCards(infoCardData)
      setLoading(false)
    }
    getInfoCards()
  }, [])

  // fetch infoCard data
  const fetchInfoCards = async () => {
    const response = await fetch(`http://localhost:5001/portfolio-7ed56/us-central1/infoCardApi?${id}`)
    const data = await response.json()

    return data
  }

  return(
    <div className={classes.mainDiv}>
      <div className={classes.button}>
        { loading === true ?
          <MoonLoader color={color} loading={loading} css={override} size={35}/> :
          infoCards.length > 0 ? <ViewInfoCards infoCards={infoCards} /> : <p className={classes.noInfoCards}>No info about me at the moment</p>
        }
      </div>
    </div>
  )
}

export default ViewInfoCardGrid
