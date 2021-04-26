import { useState } from 'react'
// Material UI
import { Paper, Grid, Typography, IconButton, Divider, makeStyles } from '@material-ui/core'
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'

// InfoCard styles
const useStyles = makeStyles({
    paper: {
      minHeight: "25vh"
    },
    deleteStyle:  {
      marginLeft: "44%"
    },
    mainDiv: {
      padding: "5%"
    },
    description: {
      marginTop: 25,
      whiteSpace: "pre-line"
    },
    title: {
      color: "#000",
      marginTop: 10
    }

});

const InfoCards = ({ infoCards, onDelete, onEdit }) => {
  const classes = useStyles();
  return(
    <div className={classes.mainDiv}>
      <Grid container spacing={4} justify="center">
        {infoCards.map((infoCard, index) => (
          <Grid key={index} item xs={12} md={4} xl={3}>
            <Paper  className={ classes.paper } elevation={24}>
              <Grid container spacing={5} justify="center">
                <Typography variant="h5" color="textSecondary" component="h2" align="center" className={classes.title}>
                  <b>{ infoCard.infoCardTitle }</b>
                </Typography>
                <IconButton aria-label="edit" onClick={() => onEdit(infoCard)}>
                  <EditIcon />
                </IconButton>
              </Grid>
              <Typography color="textSecondary" component="p" align="center" className={classes.description}>
                { infoCard.description }
              </Typography>
              <IconButton aria-label="delete" className={classes.deleteStyle} onClick={() => onDelete(infoCard.id)}>
                <ClearIcon/>
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
    )
}

export default InfoCards
