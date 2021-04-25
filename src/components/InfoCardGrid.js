import { useState, useEffect } from 'react'
// Material UI
import { Modal, Grid, makeStyles } from '@material-ui/core'
// Imported Components
import InfoCards from './InfoCards'
import AddInfoCard from './AddInfoCard'
import EditInfoCard from './EditInfoCard'
import AddButton from './AddButton'

// InfoCard Grid Stlyes Modal, Grid, makeStyles
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "75%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mainDiv: {
    marginTop: "3em",
    backgroundColor: '#fff'
  },
  button: {
    color: '#fff'
  },
  noInfoCards: {
    textAlign: "center",
    paddingTop: "5em"
  }
}));

// Modal styles
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const InfoCardGrid = () => {
  const classes = useStyles();
  const [infoCards, setInfoCards] = useState([])
  const [editFlag, setEditFlag] = useState(false)
  const [editInfoCards, setEditInfoCards] = useState()
  const [editInfoCardData, setEditInfoCardData] = useState()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

  // Open add infoCard Modal
  const handleOpen = () => {
   setOpen(true)
  };

  // Open infoCard edit modal
  const handleEditOpen = (infoCard) => {
      setOpen(true)
      setEditFlag(true)
      setEditInfoCardData(infoCard)
  };

  // Close Modal
  const handleClose = () => {
     setOpen(false)
     setEditFlag(false)
  };

  // Get infoCard data & set loading spinner to false
  useEffect(() => {
    const getInfoCards = async () => {
      const infoCardData = await fetchInfoCards()
      setInfoCards(infoCardData)
    }
    getInfoCards()
  }, [])

  // fetch infoCard data
  const fetchInfoCards = async () => {
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/infoCardApi')
    const data = await response.json()

    return data
  }

  // Add infoCard data
  const addInfoCard = async (infoCard) => {
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/infoCardApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(infoCard)
    })
    // Close modal on add
    setOpen(false)
    // const data = await response.json()
    // Merge new infoCard data
    // setinfoCards([...infoCards, data])
    // Get ID for new infoCard
    const infoCardData = await fetchInfoCards()
    setInfoCards(infoCardData)
  }

  // Delete infoCard data
  const deleteInfoCard = async (id) => {
    await fetch(`https://us-central1-portfolio-7ed56.cloudfunctions.net/infoCardApi/${id}`, {
      method: 'DELETE',
    })
    // Filter infoCard id to delete
    setInfoCards(infoCards.filter(infoCard => infoCard.id !== id))
  }

  // Update infoCard data
  const updateInfoCard = async (updatedData) => {
    const id = updatedData.id
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/infoCardApi', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })

    const data = await response.json()
    // Get infoCard id to update infoCard data
    const dataIndex = infoCards.findIndex(infoCard => infoCard.id === id)
    // Set new data array for updated infoCard data
    const newData = [...infoCards]
    // Set updated data
    newData[dataIndex] = data
    // Update state
    setInfoCards(newData)
  }

  // Setting up Modal body
  const body = (
     <div style={modalStyle} className={classes.paper}>
       { editFlag === false ? <h2>Add InfoCard Here!</h2> : <h2>Update {editInfoCardData.infoCardName} InfoCard!</h2> }
       { editFlag === false ? <AddInfoCard onAdd={addInfoCard} /> : <EditInfoCard infoCardData={editInfoCardData} onUpdate={updateInfoCard}/> }
     </div>
   );

  return(
    <div className={classes.mainDiv}>
      <Grid container justify="center" style={{marginBottom:'2em'}}>
        <AddButton onClick={handleOpen} addInfoCard={true} />
      </Grid>
      {
        infoCards.length > 0 ? <InfoCards onDelete={deleteInfoCard} infoCards={infoCards} onEdit={handleEditOpen}/> : <p className={classes.noInfoCards}>No info about me at the moment</p>
      }

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

export default InfoCardGrid
