import { useState, useEffect } from 'react'
// Material UI
import { TextField } from '@material-ui/core'
// Imported Components
import AddButton from './AddButton'
import ProgressBar from './ProgressBar'

const UploadPDF = ({ uploadPDF }) => {
  const [pdf, setPdf] = useState(null)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('')
  // Setting acceptable image types
  const types = ['application/pdf']

  // Sends project data to api call in the ProjectGrid component
  const addPDF = (e) => {
    e.preventDefault()

    uploadPDF({ url })
  }

  // Checks & verifies PDFs being uploaded
  const pdfHandler = (e) => {
    const selected = e.target.files[0]
    if(selected && types.includes(selected.type)){
      setPdf(selected)
      setError(null)
    } else {
      setPdf(null)
      setError('Please select a PDF file (PDF)')
    }
  }

  return(
    <div>
      <TextField id="fileToUpload" label="PDF" fullWidth type="file" onChange={pdfHandler}/>
      <span>
       { error && <div> { error } </div> }
       { pdf && <div> { pdf.name } </div> }
      </span>
       { pdf && <ProgressBar file={pdf} setFile={setPdf} setUrl={setUrl}/>}

       <AddButton onClick={addPDF} upload={true} style={{marginLeft: "90%", marginTop: 20}} />
    </div>
  )
}

export default UploadPDF
