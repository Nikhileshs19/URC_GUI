import { data } from 'autoprefixer'
import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000' // Update with your backend server endpoint

const CommandOutput = ({ command }) => {
  const [output, setOutput] = useState('')

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)

    setOutput('') // Clear the output when a new command is triggered

    // Event listeners for receiving output from the backend based on the selected command
    if (command === 'rpilaunch') {
      socket.on('rpilaunchResult', (data) => {
        setOutput(data.output)
      })
    }

    // Event listeners for receiving output from the backend based on the selected command
    if (command === 'susensorLaunch') {
      socket.on('susensorResult', (data) => {
        setOutput(data.output)
      })
    }

    // Event listeners for receiving output from the backend based on the selected command
    if (command === 'sensorLaunch') {
      socket.on('sensorResult', (data) => {
        setOutput(data.output)
      })
    }

    // Event listeners for receiving output from the backend based on the selected command
    if (command === 'plannerLaunch') {
      socket.on('plannerResult', (data) => {
        setOutput(data.output)
        console.log(data.output)
      })
    }

    // Event listeners for receiving output from the backend based on the selected command
    if (command === 'roscoreLaunch') {
      socket.on('roscoreResult', (data) => {
        setOutput(data.output)
        console.log(data.output)
      })
    }

    // console.log('Setting up event listeners for command:', command)
    // Add event listeners for other commands if needed

    return () => socket.disconnect() // Clean up on unmount
  }, [command])

  return (
    <div>
      Output
      <pre>{output}</pre>
    </div>
  )
}

export default CommandOutput
