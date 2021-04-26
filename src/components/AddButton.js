import React from 'react'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PublishIcon from '@material-ui/icons/Publish'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { makeStyles } from '@material-ui/core/styles'

// Style button colors
const useStyles = makeStyles((theme) => ({
  projectButton: {
    color: '#f97171'
  },
  saveSkillButton: {
    color: '#f97171'
  },
  skillButton: {
    color: '#000'
  },
  infoCardButton: {
    color: '#8ad6cc'
  },
  pdfButton: {
    color: '#000'
  }
}));

// Reusable button component
const AddButton = ({onClick, style, upload, addProject, addSkill, addInfoCard, addPdf, type}) => {
  // Type prop determines whether its a submit or an onClick
  const classes = useStyles();
  return(
    <div>
      {type === true ?
        <Button className={classes.saveSkillButton} type="submit" style={style}>
          {addSkill &&  <AddBoxIcon fontSize="large"/>}
        </Button>
      :
        <Button color="secondary" onClick={onClick} style={style}>
          { upload && <AddBoxIcon className={classes.saveSkillButton} fontSize="large"/> }
          { addProject && <AddCircleIcon className={classes.projectButton} fontSize="large"/> }
          { addSkill && <AddBoxIcon className={classes.skillButton} fontSize="large"/> }
          { addInfoCard &&  <AddCircleIcon className={classes.infoCardButton} fontSize="large"/> }
          { addPdf && <AddCircleIcon className={classes.pdfButton} fontSize="small"/> }
        </Button>
      }
    </div>
  )
}

export default AddButton
