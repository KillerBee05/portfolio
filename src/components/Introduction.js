import {useState, useEffect} from 'react'
// Material UI
import { Paper, Grid, Typography, IconButton, Divider, makeStyles } from '@material-ui/core'
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'
// Sweet alerts
import Swal from 'sweetalert2'

// InfoCard styles
const useStyles = makeStyles({
    paper: {
      minHeight: "25vh"
    },
    deleteStyle:  {
      marginLeft: "48.5%",
      marginTop: "2em"
    },
    mainDiv: {
      padding: "5%"
    },
    description: {
      color: "#000",
      marginTop: 25,
      whiteSpace: "pre-line"
    },
    title: {
      color: "#000",
      marginTop: 10
    }
});

// Introduction component
const Introduction = ({ introduction, onDelete, onEdit }) => {
  const classes = useStyles();

  const deleteIntroduction = (introduction) => {
      Swal.fire({
      title: 'Remove Info Card?',
      text: "Remove Introduction ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97171',
      cancelButtonColor: '#385a7c',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(introduction.id)
        Swal.fire(
          'Deleted!',
          'Introduction has been removed',
          'success'
        )
      }
    })
  }
  return(
    <div className={classes.mainDiv}>
      <Grid container>
        {introduction.map((introduction, index) => (
          <Grid key={index}>
            <Grid container spacing={5} justify="center">
              <IconButton aria-label="edit" onClick={() => onEdit(introduction)}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Typography variant="h5" color="textSecondary" component="h2" align="center" className={classes.description}>
              { introduction.introduction }
            </Typography>
            <IconButton aria-label="delete" className={classes.deleteStyle} onClick={() => deleteIntroduction(introduction)}>
              <DeleteIcon/>
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Introduction
