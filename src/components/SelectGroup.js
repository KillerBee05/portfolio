import { useState, useEffect } from 'react'
// Material UI
import { Select, MenuItem, Grid } from '@material-ui/core'

// Select Group component
const SelectGroup = ({ getGroupId }) => {
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState('')

  // Get group data
  useEffect(() => {
    const getGroups = async () => {
      const groupData = await fetchGroupOptions()
      setOptions(groupData)
    }
    getGroups()
  }, [])

  // Fetch group data
  const fetchGroupOptions = async () => {
    const response = await fetch('https://us-central1-portfolio-7ed56.cloudfunctions.net/groupApi/selectGroup')
    const data = await response.json()

    return data
  }

  // Get selected data
  const handleChange = (e) => {
    let selectedItem = e.target.value
    setSelected(selectedItem)
    getGroupId(selectedItem)
  }
  // TODO set a default menu item named select one
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
            {options.map(option => (
              <MenuItem key={option.id} value={option.id} > {option.group} </MenuItem>
            ))}
          </Select>
        </Grid>
    </div>
  )
}

export default SelectGroup
