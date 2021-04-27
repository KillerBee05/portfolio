import { useState, useEffect } from 'react'
import {Grid, IconButton, Divider, Paper, Typography} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'

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
const Groups = ({ groups, onEdit, onDelete, onDeleteSkill }) => {
  const classes = useStyles();
  // Delete skill
  const deleteSkill = (index, skillGroup) => {
    const id = skillGroup.id
    const group = skillGroup.group
    const updatedSkills = skillGroup.skills.slice(0, index).concat(skillGroup.skills.slice(index + 1, skillGroup.length))
    const skills = updatedSkills
    onDeleteSkill({id, group, skills})
  }

  return(
    <Grid container spacing={1} item xs={10} md={12} xl={12} justify="center">
      {groups.map((group, index) => (
        <Grid key={index} item xs={12} md={3} xl={2}>
          <Paper  className={classes.paper} elevation={3}>
            <Grid container justify="center">
              <Typography variant="h5" color="textSecondary" component="h2" align="center" className={classes.title}>
                <b>{group.group}</b>
              </Typography>
              <IconButton aria-label="edit" onClick={() => onEdit(group)}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Divider />
            {group.skills.map((skill, index) => (
              <Grid key={skill} container justify="center">
                <li className={classes.li}>
                  <Typography  component="p">
                    {skill}
                    <IconButton aria-label="delete" style={{dislplay: "flex"}} onClick={() => deleteSkill(index, group)}>
                      <DeleteIcon style={{alignContent: "flex-end"}}/>
                    </IconButton>
                  </Typography>
                </li>
              </Grid>
            ))}
            <IconButton aria-label="delete" className={classes.deleteStyle} onClick={() => onDelete(group.id)}>
              <ClearIcon/>
            </IconButton>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default Groups
