import {useState, useEffect} from 'react'
// Material UI
import { Modal, Grid, makeStyles } from '@material-ui/core'
// Imported Components
import Projects from './Projects'
import AddProject from './AddProject'
import EditProject from './EditProject'
import AddButton from './AddButton'
// Loading Spinner
import MoonLoader from "react-spinners/MoonLoader"
import { css } from "@emotion/core"

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
    marginTop: "3em",
    backgroundColor: '#fff'
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
const ProjectGrid = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([])
  const [editFlag, setEditFlag] = useState(false)
  const [editProjectData, setEditProjectData] = useState()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#f97171");

  // Open add project Modal
  const handleOpen = () => {
   setOpen(true)
  };

  // Open project edit modal
  const handleEditOpen = (project) => {
      setOpen(true)
      setEditFlag(true)
      setEditProjectData(project)
  };

  // Close Modal
  const handleClose = () => {
     setOpen(false)
     setEditFlag(false)
  };

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
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/projectApi')
    const data = await response.json()

    return data
  }

  // Add project data
  const addProject = async (project) => {
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/projectApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project)
    })
    // Close modal on add
    setOpen(false)
    // const data = await response.json()
    // Merge new project data
    // setProjects([...projects, data])
    // Get ID for new project
    const projectData = await fetchProjects()
    setProjects(projectData)
  }

  // Delete project data
  const deleteProject = async (id) => {
    await fetch(`https://us-central1-portfolio-7ed56.cloudfunctions.net/projectApi/${id}`, {
      method: 'DELETE',
    })
    // Filter project id to delete
    setProjects(projects.filter(project => project.id !== id))
  }

  // Update project data
  const updateProject = async (updatedData) => {
    const id = updatedData.id
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/projectApi', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })

    const data = await response.json()
    // Get project id to update project data
    const dataIndex = projects.findIndex(project => project.id === id)
    // Set new data array for updated project data
    const newData = [...projects]
    // Set updated data
    newData[dataIndex] = data
    // Update state
    setProjects(newData)
  }

  // Setting up Modal body
  const body = (
     <div style={modalStyle} className={classes.paper}>
       {editFlag === false ? <h2>Add Project Here!</h2> : <h2>Update {editProjectData.projectName} Project!</h2>}
       {editFlag === false ? <AddProject onAdd={addProject} /> : <EditProject projectData={editProjectData} onUpdate={updateProject}/>}
     </div>
   );

  return(
    <div className={classes.mainDiv}>
        <div className={classes.button}>
          <AddButton onClick={handleOpen} addProject={true} style={{display: 'block', margin: '0 auto'}}/>
        </div>

      { loading === true ?
        <MoonLoader color={color} loading={loading} css={override} size={35}/> :
        projects.length > 0 ? <Projects onDelete={deleteProject} projects={projects} onEdit={handleEditOpen}/> : <p className={classes.noProjects}>No projects at the moment</p>
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        justify="center"
      >
        {body}
      </Modal>
    </div>
  )
}

export default ProjectGrid
