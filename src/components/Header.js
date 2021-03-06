import { useState, useEffect } from 'react'
// Material UI
import { AppBar, Toolbar, Link, Switch, FormControlLabel, Drawer, Typography, Modal, Grid, makeStyles, withStyles } from '@material-ui/core'
// components
import SkillDrawer from './SkillDrawer'
import SkillList from './SkillList'
import AddButton from './AddButton'
import MobileNavDrawer from './MobileNavDrawer'
import UploadPDF from './UploadPDF'
// Icons
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import DescriptionIcon from '@material-ui/icons/Description'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// Style colors
import { purple, blue, pink, green, red } from '@material-ui/core/colors'
// Router
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'

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
    '@media (max-width: 400px)' : {
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
  hideIcons: {
    '@media (max-width: 400px)' : {
      display:'none'
    }
  },
  mobileNav: {
    '@media (min-width: 450px)' : {
      display:'none',
      marginRight: theme.spacing(2),
    },
    '@media (max-width: 400px)' : {
      marginRight: theme.spacing(0),
    },
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
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [showSkills, setShowSkills] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [pdf, setPdf] = useState([])
  const [openNav, setOpenNav] = useState(false)
  const history = useHistory()

  // Open add pdf Modal
  const handleOpenPdf = () => {
   setOpen(true)
  };

  // Close Modal
  const handleClosePdf = () => {
     setOpen(false)
  };

  // Show skill drawer
  const handleChangeMobileNav = () => {
    if(openNav === true){
      setOpenNav(false)
    } else {
      setOpenNav(true)
    }
  }

  // Show skill drawer
  const handleChangeSkills = () => {
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
    const response = await fetch(`http://localhost:5001/portfolio-7ed56/us-central1/pdfApi/auth?${userId}`, {
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
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

  const account = () => {
    alert('here we goooo')
    history.push("/profile")
  }
  // log user out
  const logUserOut = () => {
    debugger;
    alert("are you sure you want to log out?")
    // clear local storage token & route user to sign in
    localStorage.setItem("token", '')
    localStorage.setItem("userId", '')
    history.push("/signIn")
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
        <IconButton edge="start" onClick={handleChangeMobileNav} className={classes.mobileNav} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" className={classes.blackText}>
            Portfolio
        </Typography>
        <section className={classes.rightToolbar}>
            <FormControlLabel
              value="top"
              control={<PurpleSwitch checked={showSkills} onChange={handleChangeSkills} name="showSkills" />}
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
          { pdf.length > 0 &&
            <Link className={classes.icons} href={pdf[0].url} target="_blank">
              <DescriptionIcon className={classes.socialPadding} />
            </Link>
          }
        </section>
        <div className={classes.hideIcons} >
          <AddButton account={true} onClick={account} />
        </div>
        <div className={classes.hideIcons} >
          <AddButton logOut={true} onClick={logUserOut} />
        </div>
      </Toolbar>
      <SkillDrawer open={openDrawer}/>
      <MobileNavDrawer toggle={handleChangeMobileNav} open={openNav} />
      <Modal
        open={open}
        onClose={handleClosePdf}
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
