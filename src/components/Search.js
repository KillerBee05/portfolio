import React from 'react'
//Material UI
import { TextField, Grid } from '@material-ui/core'
//Icons
import SearchIcon from '@material-ui/icons/Search'

// Search component
const Search = ({filterText, handleChange}) => {
  return(
      <Grid  container spacing={3} alignItems="center" justify="center" className="header-space">
        <Grid>
          <SearchIcon className="search-icon-space"/>
        </Grid>
        <Grid item xs={6} md={10} xl={10}>
          <TextField value={filterText} onChange={handleChange} label="Filter projects" className="padding" fullWidth color="secondary"/>
        </Grid>
      </Grid>
  )
}

export default Search
