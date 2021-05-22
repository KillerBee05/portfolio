import {useState, useEffect} from 'react'
import { Modal, Grid, makeStyles } from '@material-ui/core'
import AddButton from './AddButton'
import Introduction from './Introduction'
import AddIntroduction from './AddIntroduction'
import EditIntroduction from './EditIntroduction'
// Loading Spinner
import MoonLoader from "react-spinners/MoonLoader"
import { css } from "@emotion/core"
import { Link, useHistory } from 'react-router-dom'

// Introduction Styles
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
    backgroundColor: '#fff',
    paddingLeft: "5%",
    paddingRight:  "5%",
  },
  button: {
    color: '#fff'
  },
  noIntroduction: {
    textAlign: "center",
    marginTop:"2em",
    paddingBottom: "5em",
    color: "black"
  },
  color: {
    backgroundColor: '#fff'
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

// Introduction component
const IntroductionGrid = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [editFlag, setEditFlag] = useState(false)

  const [introduction, setIntroduction] = useState([])
  const [editIntroductionData, setEditIntroductionData] = useState()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#f97171");

  // Open add infoCard Modal
  const handleOpen = () => {
   setOpen(true)
  };

  // Open infoCard edit modal
  const handleEditOpen = (introduction) => {
      setOpen(true)
      setEditFlag(true)
      setEditIntroductionData(introduction)
  };

  // Close Modal
  const handleClose = () => {
     setOpen(false)
     setEditFlag(false)
  };

  // Gets introduction data when component renders
  useEffect(() => {
    const getIntroduction = async () => {
      const introductionData = await fetchIntroduction()
      setIntroduction(introductionData)
      console.log(introduction)
      setLoading(false)
    }
    getIntroduction()
  }, [])

  // Fetch introduction data
  const fetchIntroduction = async () => {
    const response = await fetch(`http://localhost:5001/portfolio-7ed56/us-central1/introApi/auth?${userId}`, {
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const data = await response.json()
    return data
  }


  const addIntroduction = async (introduction) => {
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/introApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(introduction)
    })
    setOpen(false)
    // Get ID for new introduction
    const introductionData = await fetchIntroduction()
    setIntroduction(introductionData)
  }

  const updateIntroduction = async (introduction) => {
    const id = introduction.id
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/introApi', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(introduction)
    })
    const data = await response.json()
    // Set new data array for updated introduction data
    const newData = [data]
    setIntroduction(newData)
  }

  // Delete infoCard data
  const deleteIntroduction = async (id) => {
    const response = await fetch(`http://localhost:5001/portfolio-7ed56/us-central1/introApi/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const data = response.json()
    // Filter infoCard id to delete
    setIntroduction(introduction.filter(introduction => introduction.id !== id))
  }

  // Setting up Modal body
  const body = (
     <div style={modalStyle} className={classes.paper}>
       { editFlag === false ? <h2>Add Introduction!</h2> : <h2>Update Introduction!</h2> }
       { editFlag === false ? <AddIntroduction onAdd={addIntroduction} userId={userId} /> : <EditIntroduction introductionData={editIntroductionData} onUpdate={updateIntroduction} userId={userId} /> }
     </div>
   );

  return(
    <div className={classes.mainDiv} >
      <div className={classes.button}>
        { introduction.length === 0 &&
          <AddButton onClick={handleOpen} addIntroduction={true} style={{display: 'block', margin: '0 auto'}} />

        }
        { loading === true ?
          <MoonLoader color={color} loading={loading} css={override} size={35}/> :
          introduction.length > 0 ? <Introduction onDelete={deleteIntroduction} introduction={introduction} onEdit={handleEditOpen}/> : <p className={classes.noIntroduction}>No introduction at the moment</p>
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

export default IntroductionGrid
