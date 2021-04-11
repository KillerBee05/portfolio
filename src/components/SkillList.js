import { useState, useEffect } from 'react'
import Skills from './Skills'
import AddSkill from './AddSkill'
import AddGroup from './AddGroup'
import Divider from '@material-ui/core/Divider'
import GroupList from './GroupList'
import EditGroup from './EditGroup'
import { Grid, Modal } from '@material-ui/core'
import SelectGroup from './SelectGroup'
import { makeStyles } from '@material-ui/core/styles';
import AddButton from './AddButton'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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
const SkillList = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  const [groups, setGroups] = useState([])
  const [groupSelected, setGroupSelected] = useState('')
  const [open, setOpen] = useState(false)
  const [editFlag, setEditFlag] = useState(false)
  const [editGroupData, setEditGroupData] = useState()

  const handleOpen = () => {
   setOpen(true)
  };

  const handleEditOpen = (project) => {
      setOpen(true)
      setEditFlag(true)
      setEditGroupData(project)
  };

  const handleClose = () => {
     setOpen(false)
     setEditFlag(false)
  };

  useEffect(() => {
    const getGroups = async () => {
      const groupData = await fetchGroups()
      setGroups(groupData)
    }
    getGroups()
  }, [])

  const fetchGroups = async () => {
    const response = await fetch('http://localhost:5000/portfolio-7ed56/us-central1/groupApi')
    const data = await response.json()
    return data
  }

  const addGroup = async (group) => {
    const response = await fetch('http://localhost:5000/portfolio-7ed56/us-central1/groupApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(group)
    })

    const data = await response.json()

    setGroups([...groups, data])
  }

  const updateGroup = async (updatedData) => {
    const id = updatedData.id
    const response = await fetch('http://localhost:5000/portfolio-7ed56/us-central1/groupApi', {
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

  const deleteGroup = async (id) => {
    await fetch(`http://localhost:5000/portfolio-7ed56/us-central1/groupApi/${id}`, {
      method: 'DELETE',
    })
    setGroups(groups.filter(group => group.id !== id))
  }

  const fetchSelectedGroupId = (selectedGroup) => {
    let groupId = selectedGroup
    setGroupSelected(groupId)
  }

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
      <Grid container spacing={12} justify="center">
        {groups.length > 0 ? <GroupList groups={groups} onDelete={deleteGroup} onEdit={handleEditOpen} onDeleteSkill={updateGroup}/> : <p style={{textAlign: "center"}}>No skills at the moment</p>}
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
