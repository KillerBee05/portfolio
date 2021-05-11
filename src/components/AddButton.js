import React from 'react'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PublishIcon from '@material-ui/icons/Publish'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import AddBoxIcon from '@material-ui/icons/AddBox'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
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
  logOutButton: {
    color: '#000'
  },
  introductionButton: {
    color: '#385a7c'
  },
  accountButton: {
    color: '#000'
  }
}));

// Reusable button component
const AddButton = ({onClick, style, upload, addProject, addSkill, addInfoCard, addIntroduction, logOut, account, type}) => {
  // Type prop determines whether its a submit or an onClick
  const classes = useStyles();
  return(
    <div>
      {type === true ?
        <Button className={classes.saveSkillButton} type="submit" style={style}>
          {addSkill &&  <AddBoxIcon fontSize="large"/>}
        </Button>
      :
        <Button onClick={onClick} style={style}>
          { upload && <AddBoxIcon className={classes.saveSkillButton} fontSize="large"/> }
          { addProject && <AddCircleIcon className={classes.projectButton} fontSize="large"/> }
          { addSkill && <AddBoxIcon className={classes.skillButton} fontSize="large"/> }
          { addInfoCard &&  <AddCircleIcon className={classes.infoCardButton} fontSize="large"/> }
          { addIntroduction && <AddCircleIcon className={classes.introductionButton} fontSize="large"/> }
          { account && <AccountCircleIcon className={classes.accountButton} fontSize="medium"/> }
          { logOut && <ExitToAppIcon className={classes.logOutButton} fontSize="medium"/> }
        </Button>
      }
    </div>
  )
}

export default AddButton
