import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, Link, CardMedia, CardHeader, CardContent, CardActions, IconButton, Typography} from '@material-ui/core'
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import DeleteIcon from '@material-ui/icons/Delete'
import Search from './Search'

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

const Projects = ({projects, onDelete, onEdit}) => {
  const classes = useStyles();
  const [filterText, setFilterText] = useState('')


 const handleChange = (newValue) => {
   setFilterText(newValue.target.value)
 }

  return(
    <div>
      <Grid container spacing={2} justify="center">
        <Search filterText={filterText} handleChange={handleChange} />
        {projects.filter((project) => {
          if(filterText === ''){
            return project
          } else if(project.projectName.toLowerCase().includes(filterText.toLowerCase())){
            return project
          }
        }).map((project) => (
        <Grid key={project.id} item xs={8} md={4} xl={4}>
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
              <IconButton aria-label="delete" onClick={() => onDelete(project.id)}>
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
