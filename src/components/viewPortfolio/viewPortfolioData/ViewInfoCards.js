import { useState } from 'react'
// Material UI
import { Paper, Grid, Typography, IconButton, Divider, makeStyles } from '@material-ui/core'

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

const ViewInfoCards = ({ infoCards }) => {
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
              </Grid>
              <Typography color="textSecondary" component="p" align="center" className={classes.description}>
                { infoCard.description }
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
    )
}

export default ViewInfoCards
