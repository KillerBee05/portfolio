import {useState, useEffect} from 'react'
// Material UI
import { Paper, Grid, Typography, IconButton, Divider, makeStyles } from '@material-ui/core'

// InfoCard styles
const useStyles = makeStyles({
    mainDiv: {
      padding: "5%"
    },
    description: {
      color: "#000",
      whiteSpace: "pre-line"
    }
});

// Introduction component
const ViewIntroduction = ({ introduction }) => {
  const classes = useStyles();
  return(
    <div className={classes.mainDiv}>
    <Grid container spacing={4} justify="center">
      {introduction.map((introduction, index) => (
        <Grid key={index} item xs={12} md={4} xl={3}>
          <Typography variant="h5" color="textSecondary" component="h2" align="center" className={classes.description}>
            { introduction.introduction }
          </Typography>
        </Grid>
      ))}
    </Grid>
    </div>
  )
}

export default ViewIntroduction
