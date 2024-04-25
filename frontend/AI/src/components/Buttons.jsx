import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import io from 'socket.io-client'

const Buttons = ({ handleButtonClick }) => {
  const [status, setStatus] = useState('')

  const socket = io('http://localhost:5000')

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
        }}
        onClick={() => handleButtonClick('rpilaunch')}>
        Rpi Launch
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
        }}
        onClick={() => handleButtonClick('roscore')}>
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
        }}
        onClick={() => handleButtonClick('jetsonsensor')}>
        Jetson Sensors
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
        }}
        onClick={() => handleButtonClick('susensor')}>
        susensor Launch
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
        }}
        onClick={() => handleButtonClick('planner')}>
        Run Planner
      </Button>
    </div>
  )
}

export default Buttons
