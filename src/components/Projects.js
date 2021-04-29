import { useState } from 'react'
// Material UI
import { Grid, Card, Link, CardMedia, CardHeader, CardContent, CardActions, IconButton, Typography, makeStyles } from '@material-ui/core'
// Imported Components
import Search from './Search'
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import DeleteIcon from '@material-ui/icons/Delete'
// Sweet alerts
import Swal from 'sweetalert2'

// Project styles
const useStyles = makeStyles((theme) => ({
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
  mainDiv: {
    padding: "5%"
  }
}));

// Project component
const Projects = ({ projects, onDelete, onEdit }) => {
  const classes = useStyles();
  const [filterText, setFilterText] = useState('')
  // Handle Search Filter
 const handleChange = (newValue) => {
   setFilterText(newValue.target.value)
 }

 const deleteProject = (project) => {
     Swal.fire({
     title: 'Remove Project?',
     text: "Remove "+project.projectName+" from projects?",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#f97171',
     cancelButtonColor: '#385a7c',
     confirmButtonText: 'Delete'
   }).then((result) => {
     if (result.isConfirmed) {
       onDelete(project.id)
       Swal.fire(
         'Deleted!',
          project.projectName+' has been removed',
         'success'
       )
     }
   })
 }

  return(
    <div className={classes.mainDiv}>
      <Grid container spacing={2} justify="center">
        <Search filterText={filterText} handleChange={handleChange} />
        {projects.filter((project) => {
          if(filterText === ''){
            return project
          }
          else if(project.projectName.toLowerCase().includes(filterText.toLowerCase())){
            return project
          }
        }).map((project) => (
        <Grid key={project.id} item xs={12} md={4} xl={3}>
          <Card  className={classes.root}>
            <CardHeader
              title={project.projectName}
              subheader={project.createdAt}
            />
            <CardMedia
              className={classes.media}
              image={project.url}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {project.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <Link color="inherit" href={project.link} target="_blank">
                  <DesktopWindowsIcon />
                </Link>
              </IconButton>
              <IconButton aria-label="delete" onClick={() => deleteProject(project)}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="edit" onClick={() => onEdit(project)}>
                <EditIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Projects
