import { Grid } from '@mui/material'
import React from 'react'

export default function MuiGridSpacer(props:any) {
  return (
    <Grid item xs={props.spacerSize}></Grid>
  )
}
