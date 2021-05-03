import { useState, useEffect } from 'react'
// Material UI
import { Modal, Grid, makeStyles } from '@material-ui/core'
// Imported Components
import InfoCards from './InfoCards'
import AddInfoCard from './AddInfoCard'
import EditInfoCard from './EditInfoCard'
import AddButton from './AddButton'
// Loading Spinner
import MoonLoader from "react-spinners/MoonLoader"
import { css } from "@emotion/core"

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

// Can be a string as well. Need to ensure each key-value pair ends with ;
// Laoding spinner css overrides
const override = css`
  display: block;
  margin: 0 auto;
`;

// Info Card Component
const InfoCardGrid = () => {
  const classes = useStyles();
  const [infoCards, setInfoCards] = useState([])
  const [editFlag, setEditFlag] = useState(false)
  const [editInfoCards, setEditInfoCards] = useState()
  const [editInfoCardData, setEditInfoCardData] = useState()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#f97171");

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
      setLoading(false)
    }
    getInfoCards()
  }, [])

  // fetch infoCard data
  const fetchInfoCards = async () => {
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/infoCardApi')
    const data = await response.json()

    return data
  }

  // Add infoCard data
  const addInfoCard = async (infoCard) => {
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/infoCardApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token'),
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
    const response = await fetch(`http://localhost:5001/portfolio-7ed56/us-central1/infoCardApi/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const data = response.json()
    // Filter infoCard id to delete
    setInfoCards(infoCards.filter(infoCard => infoCard.id !== id))
  }

  // Update infoCard data
  const updateInfoCard = async (updatedData) => {
    const id = updatedData.id
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/infoCardApi', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token'),
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
      <div className={classes.button}>
        <AddButton onClick={handleOpen} addInfoCard={true} style={{display: 'block', margin: '0 auto'}} />
        { loading === true ?
          <MoonLoader color={color} loading={loading} css={override} size={35}/> :
          infoCards.length > 0 ? <InfoCards onDelete={deleteInfoCard} infoCards={infoCards} onEdit={handleEditOpen}/> : <p className={classes.noInfoCards}>No info about me at the moment</p>
        }
      </div>
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
