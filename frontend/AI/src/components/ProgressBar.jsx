import { React, useState, useEffect } from 'react'
import { Spacer } from '@nextui-org/react'
import LinearProgress from '@mui/material/LinearProgress'

const ProgressBar = () => {
  const duration = 13.5
  const [progress, setProgress] = useState(0)
  const increment = 100 / (duration * 10)

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the increment value based on the desired duration (20 seconds) and total progress (100%)
      // const increment = 100 / 20 // 100% divided by 20 seconds

      // Increment the progress until it reaches 100%
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + increment
      )
    }, 100) // Interval set to 1 second (1000 milliseconds)

    // Clear the interval when the component unmounts or when progress reaches 100%
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='h-full text-4xl font-bold  col-span-4 rounded-lg bg-zinc-800 shadow-md border border-white'>
      <Spacer y={1} />
      <h1 style={{ fontSize: '90px' }}>Autonomous Navigation Mission</h1>
      <Spacer y={1} />
      <LinearProgress
        value={progress}
        variant='determinate'
        sx={{
          height: 20,
          width: 1600,
          marginLeft: 3,
          marginBottom: 2, // Adjust the height of the progress bar
        }}
      />
      {/* <Spacer /> */}
    </div>
  )
}

export default ProgressBar
