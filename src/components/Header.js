import { useState, useEffect } from 'react'
// Material UI
import { AppBar, Toolbar, Link, Switch, FormControlLabel, Drawer, Typography, Modal, Grid, makeStyles, withStyles } from '@material-ui/core'
// components
import SkillDrawer from './SkillDrawer'
import SkillList from './SkillList'
import AddButton from './AddButton'
import UploadPDF from './UploadPDF'
// Icons
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import DescriptionIcon from '@material-ui/icons/Description'
// Style colors
import { purple, blue, pink, green, red } from '@material-ui/core/colors'

// Header Styles
const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: '#f97171'
  },
  icons: {
    color: '#000'
  },
  rightToolbar: {
    marginLeft: "auto",
    paddingTop: "1em"
  },
  socialPadding: {
    paddingLeft: "1em",
    '@media (max-width: 320px)' : {
      paddingLeft: '15px',
    }
  },
  blackText: {
    color: '#000'
  },
  paper: {
    position: 'absolute',
    width: "75%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  hide: {
    '@media (max-width: 400px)' : {
      display:'none'
    }
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
    // height: "100%",
  };
}

// Toggle switch style
const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[100],
    '&$checked': {
      color: purple[200],
    },
    '&$checked + $track': {
      backgroundColor: blue[900],
    },
  },
  checked: {},
  track: {},
})(Switch);

// Header component
const Header = () => {
  const classes = useStyles();
  const [showSkills, setShowSkills] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [pdf, setPdf] = useState(null)


  // Open add pdf Modal
  const handleOpen = () => {
   setOpen(true)
  };

  // Close Modal
  const handleClose = () => {
     setOpen(false)
  };

  // Show skill drawer
  const handleChange = () => {
    setShowSkills(!showSkills)
    if(showSkills){
      setOpenDrawer(false);
    } else {
      setOpenDrawer(true);
    }
  }

  // Get pdf
  useEffect(() => {
    const getPDF = async () => {
      const pdfData = await fetchPDF()
      setPdf(pdfData)
    }
    getPDF()
  }, [])

  // fetch PDF
  const fetchPDF = async () => {
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/pdfApi')
    const data = await response.json()
    
    return data
  }

  // Add PDF
  const addPDF = async (pdf) => {
    const response = await fetch('http://localhost:5001/portfolio-7ed56/us-central1/pdfApi', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(pdf)
    })
    // Close modal on add
    setOpen(false)
    const pdfData = await fetchPDF()
    setPdf(pdfData)
  }

  const viewPDF = () => {
    setOpen(true)
  }

  // Setting up Modal body
  const body = (
     <div style={modalStyle} className={classes.paper}>
       <h2>Upload PDF</h2>
       <UploadPDF uploadPDF={addPDF} />
     </div>
  );

  return(
    <AppBar position="static" className={classes.background}>
      <Toolbar>
        <Typography variant="h5" className={classes.blackText}>
            Portfolio
        </Typography>
        <section className={classes.rightToolbar}>
            <FormControlLabel
              value="top"
              control={<PurpleSwitch checked={showSkills} onChange={handleChange} name="showSkills" />}
              label="Skills"
              labelPlacement="bottom"
              className={classes.blackText}
            />
          <Link className={classes.icons} href="https://www.linkedin.com/in/evan-herring-7019a975/" target="_blank">
            <LinkedInIcon />
          </Link>
          <Link className={classes.icons}  href="https://github.com/KillerBee05" target="_blank">
            <GitHubIcon className={classes.socialPadding}/>
          </Link>
          { pdf !== null &&
            <Link className={classes.icons} href={pdf.pdf.url} target="_blank">
              <DescriptionIcon className={classes.socialPadding} />
            </Link>
          }
        </section>
        <div className={classes.hide}>
        <AddButton addPdf={true} onClick={handleOpen} />
        </div>
      </Toolbar>
      <SkillDrawer switch={handleChange} open={openDrawer}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        justify="center"
      >
        {body}
      </Modal>
    </AppBar>
  )
}

export default Header
