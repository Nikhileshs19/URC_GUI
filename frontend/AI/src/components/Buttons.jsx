import { Button } from '@nextui-org/react'
import React from 'react'

const Buttons = () => {
  return (
    <div className='flex flex-col justify-around'>
      <Button
        size='lg'
        radius='lg'
        variant='ghost'
        style={{
          fontSize: '25px',
          color: '#3ec363',
          width: '100%',
          border: '2px solid #FFFFFF',
          marginBottom: '10px',
        }}>
        ssh Jetson
      </Button>
      <Button
        size='lg'
        radius='lg'
        variant='ghost'
        style={{
          fontSize: '25px',
          color: '#3ec363',
          width: '100%',
          border: '2px solid #FFFFFF',
          marginBottom: '10px',
        }}>
        Roscore
      </Button>
      <Button
        size='lg'
        radius='lg'
        variant='ghost'
        style={{
          fontSize: '25px',
          color: '#3ec363',
          width: '100%',
          border: '2px solid #FFFFFF',
          marginBottom: '10px',
        }}>
        ssh RPi
      </Button>
      <Button
        size='lg'
        radius='lg'
        variant='ghost'
        style={{
          fontSize: '25px',
          color: '#3ec363',
          width: '100%',
          border: '2px solid #FFFFFF',
          marginBottom: '10px',
        }}>
        RPi - Launch Sensors
      </Button>
      <Button
        size='lg'
        radius='lg'
        variant='ghost'
        style={{
          fontSize: '25px',
          color: '#3ec363',
          width: '100%',
          border: '2px solid #FFFFFF',
          marginBottom: '10px',
        }}>
        Jetson - Launch Sensors
      </Button>
      <Button
        size='lg'
        radius='lg'
        variant='ghost'
        style={{
          fontSize: '25px',
          color: '#3ec363',
          width: '100%',
          border: '2px solid #FFFFFF',
        }}>
        Run Planner
      </Button>
    </div>
  )
}

export default Buttons
