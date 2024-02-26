import React from 'react'
import { Progress, Spacer } from '@nextui-org/react'
import LinearProgress from '@mui/material/LinearProgress'

const ProgressBar = () => {
  return (
    <div className='text-4xl font-bold border border-black  col-span-4'>
      <h1>AutEx GUI</h1>
      <Spacer y={1} />
      <LinearProgress value={50} variant='determinate' />
    </div>
  )
}

export default ProgressBar
