import {useState, useEffect} from 'react'
// Material UI
import { Modal, Grid, makeStyles } from '@material-ui/core'
// Imported Components
import ViewProjects from './viewPortfolioData/ViewProjects'
// Loading Spinner
import MoonLoader from "react-spinners/MoonLoader"
import { css } from "@emotion/core"
// router
import { BrowserRouter as Router, Route, Switch, Link, useHistory, useParams } from 'react-router-dom'

// Project Grid Stlyes
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
    // marginTop: "1em",
    // backgroundColor: '#fff'
  },
  button: {
    display: 'block',
    margin: '0 auto'
  },
  noProjects: {
    textAlign: "center",
    paddingTop: "5em"
  }
}));

// Modal styles
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// Can be a string as well. Need to ensure each key-value pair ends with ;
// Laoding spinner css overrides
const override = css`
  display: block;
  margin: 0 auto;
`;

// Project Grid component
const ViewProjectGrid = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#f97171");
  const { id } = useParams()

  // Get project data & set loading spinner to false
  useEffect(() => {
    const getProjects = async () => {
      const projectData = await fetchProjects()
      setProjects(projectData)
      setLoading(false)
    }
    getProjects()
  }, [])

  // fetch project data
  const fetchProjects = async () => {
    const response = await fetch(`http://localhost:5001/portfolio-7ed56/us-central1/projectApi?${id}`)
    const data = await response.json()

    return data
  }

  return(
    <div className={classes.mainDiv}>
      { loading === true ?
        "":
        projects.length > 0 ? <ViewProjects projects={projects} /> : <p className={classes.noProjects}>No projects at the moment</p>
      }
    </div>
  )
}

export default ViewProjectGrid
