import { CircularProgress } from '@mui/material'
import React from 'react'

export default function UploadMessage(message:string) {
  return (
    <>
        <CircularProgress />
        <span >{message}</span>
    </>
  )
}