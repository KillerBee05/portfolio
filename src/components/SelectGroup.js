import { useState, useEffect } from 'react'
import {Select, MenuItem, Grid} from '@material-ui/core'

const SelectGroup = ({ getGroupId }) => {
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    const getGroups = async () => {
      const groupData = await fetchGroupOptions()
      setOptions(groupData)
    }
    getGroups()
  }, [])

  const fetchGroupOptions = async () => {
    const response = await fetch('http://localhost:5000/portfolio-7ed56/us-central1/groupApi/selectGroup')
    const data = await response.json()

    return data
  }

  const handleChange = (e) => {
    let selectedItem = e.target.value
    setSelected(selectedItem)
    getGroupId(selectedItem)
  }

  return(
    <div>
      <Grid container spacing={4} justify="center" style={{ marginTop:35}}>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            onChange={handleChange}
            style={{width:"75%", marginRight:"4em"}}
            required
          >
            <MenuItem value="Select One" > </MenuItem>
            {options.map(option => (
              <MenuItem key={option.id} value={option.id} > {option.group} </MenuItem>
            ))}
          </Select>
        </Grid>
    </div>
  )
}

export default SelectGroup
