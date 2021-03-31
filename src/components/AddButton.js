import React from 'react'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PublishIcon from '@material-ui/icons/Publish';

const AddButton = ({onClick, style, upload}) => {
  return(
    <Button color="secondary" onClick={onClick} style={style}>
      {upload === false ? <AddCircleIcon fontSize="large"/> : <PublishIcon fontSize="large"/>}
    </Button>
  )
}

export default AddButton
