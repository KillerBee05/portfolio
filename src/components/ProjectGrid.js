import {useState, useEffect} from 'react'
import { Modal, Grid } from '@material-ui/core'
import Projects from './Projects'
import AddButton from './AddButton'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const ProjectGrid = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState([])
  const [editFlag, setEditFlag] = useState(false)
  const [editProjectData, setEditProjectData] = useState()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

 const handleOpen = () => {
   setOpen(true)
 };

  const handleEditOpen = (project) => {
      setOpen(true)
      setEditFlag(true)
      setEditProjectData(project)
  };

  const handleClose = () => {
     setOpen(false)
     setEditFlag(false)
  };

  useEffect(() => {
    const getProjects = async () => {
      const projectData = await fetchProjects()
      setProjects(projectData)
    }
    getProjects()
  }, [])

  const fetchProjects = async () => {
    const response = await fetch('http://localhost:5000/portfolio-7ed56/us-central1/projectApi')
    const data = await response.json()

    return data
  }

  const addProject = async (project) => {
    const response = await fetch('http://localhost:5000/portfolio-7ed56/us-central1/projectApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project)
    })

    const data = await response.json()

    setProjects([...projects, data])
  }

  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/portfolio-7ed56/us-central1/projectApi/${id}`, {
      method: 'DELETE',
    })

    setProjects(projects.filter(project => project.id !== id))
  }

  const updateProject = async (updatedData) => {
    const id = updatedData.id
    const response = await fetch('http://localhost:5000/portfolio-7ed56/us-central1/projectApi', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })

    const data = await response.json()
    const dataIndex = projects.findIndex(project => project.id === id)
    const newData = [...projects]
    newData[dataIndex] = data
    setProjects(newData)
  }




  const body = (
     <div style={modalStyle} className={classes.paper}>
       {editFlag === false ? <h2 id="simple-modal-title">Add Project Here!</h2> : <h2 id="simple-modal-title">Update {editProjectData.projectName} Project!</h2>}
       {editFlag === false ? <AddProject onAdd={addProject} /> : <EditProject projectData={editProjectData} onUpdate={updateProject}/>}
     </div>
   );

  return(
    <div style={{marginTop: "5em"}} >
      {projects.length > 0 ? <Projects onDelete={deleteProject} projects={projects} onEdit={handleEditOpen}/> : <p style={{textAlign: "center"}}>No projects at the moment</p>}

      <Grid container spacing={4} justify="center" style={{marginTop: '2em'}}>
        <AddButton onClick={handleOpen} upload={false} justify="center"/>
      </Grid>

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
