import { useState, useEffect } from 'react'
// Material UI
import { Grid, Modal, Divider, makeStyles } from '@material-ui/core'
// Imported Components
import AddSkill from './AddSkill'
import AddGroup from './AddGroup'
import Groups from './Groups'
import EditGroup from './EditGroup'
import SelectGroup from './SelectGroup'
import AddButton from './AddButton'

// Skill List styles
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
// Skill List component
const SkillList = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  const [groups, setGroups] = useState([])
  const [groupSelected, setGroupSelected] = useState('')
  const [open, setOpen] = useState(false)
  const [editFlag, setEditFlag] = useState(false)
  const [editGroupData, setEditGroupData] = useState()

  // Open modal
  const handleOpen = () => {
   setOpen(true)
  };

  // Open edit modal
  const handleEditOpen = (project) => {
      setOpen(true)
      setEditFlag(true)
      setEditGroupData(project)
  };

  // Close modal
  const handleClose = () => {
     setOpen(false)
     setEditFlag(false)
  };

  // Get group data when component renders
  useEffect(() => {
    const getGroups = async () => {
      const groupData = await fetchGroups()
      setGroups(groupData)
    }
    getGroups()
  }, [])

  // Fetch group data
  const fetchGroups = async () => {
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/groupApi')
    const data = await response.json()
    return data
  }

  // Add group
  const addGroup = async (group) => {
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/groupApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(group)
    })

    const data = await response.json()

    setGroups([...groups, data])
  }

  // Update group
  const updateGroup = async (updatedData) => {
    const id = updatedData.id
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/groupApi', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
    const data = await response.json()
    const dataIndex = groups.findIndex(group => group.id === id)

    const newData = [...groups]
    newData[dataIndex] = data
    setGroups(newData)
  }

  // Delete group
  const deleteGroup = async (id) => {
    await fetch(`https://us-central1-portfolio-7ed56.cloudfunctions.net/groupApi/${id}`, {
      method: 'DELETE',
    })
    setGroups(groups.filter(group => group.id !== id))
  }

  // Get selected group id from modal
  const fetchSelectedGroupId = (selectedGroup) => {
    let groupId = selectedGroup
    setGroupSelected(groupId)
  }

  // Set modal body
  const body = (
     <div style={modalStyle} className={classes.paper}>
       {editFlag === false ? <AddGroup onAdd={addGroup} /> : <EditGroup onEdit={updateGroup} groupData={editGroupData}/>}
       {groups.length > 0 && editFlag === false ? <SelectGroup getGroupId={fetchSelectedGroupId} /> : ''}
       {groups.length > 0 && editFlag === false ? <AddSkill groups={groups} onAdd={updateGroup} addSkill={true} groupId={groupSelected} />  : ''}
     </div>
   );

  return(
    <div >
      <Grid container spacing={4} justify="center" style={{marginTop: '0em', marginBottom: '2em'}}>
        <AddButton onClick={handleOpen} addSkill={true} />
      </Grid>
      <Grid container spacing={10} justify="center">
        {groups.length > 0 ? <Groups groups={groups} onDelete={deleteGroup} onEdit={handleEditOpen} onDeleteSkill={updateGroup}/> : <p style={{textAlign: "center"}}>No skills at the moment</p>}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        justify="center"
      >
        {body}
      </Modal>
    </div>
  )
}

export default SkillList
