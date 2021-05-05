import { useState, useEffect } from 'react'
import {Grid, IconButton, Divider, Paper, Typography} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

// Group Styles
const useStyles = makeStyles({
    paper: {
      minHeight: "35vh"
    },
    deleteStyle:  {
      marginLeft: "44%"
    },
    li: {
      listStyleType: "none",
      marginTop: 5
    },
    title: {
      color: "#000",
      marginTop: 10
    }

});

// Skill group component
const ViewGroups = ({ groups }) => {
  const classes = useStyles();

  return(
    <Grid container spacing={1} item xs={10} md={12} xl={12} justify="center">
      {groups.map((group, index) => (
        <Grid key={index} item xs={12} md={3} xl={2}>
          <Paper  className={classes.paper} elevation={3}>
            <Grid container justify="center">
              <Typography variant="h5" color="textSecondary" component="h2" align="center" className={classes.title}>
                <b>{group.group}</b>
              </Typography>
            </Grid>
            <Divider />
            {group.skills.map((skill, index) => (
              <Grid key={skill} container justify="center">
                <li className={classes.li}>
                  <Typography  component="p">
                    {skill}
                  </Typography>
                </li>
              </Grid>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default ViewGroups
