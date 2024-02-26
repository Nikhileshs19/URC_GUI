import { exec } from 'postcss-loader/dist/utils'
import React, { useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const TerminalButton = ({ command }) => {
  const [commandResult, setCommandResult] = useState(null)

  const executeEvent = `execute${command}` // Construct event name based on command
  const resultEvent = `${command}Result`
  console.log(executeEvent, resultEvent)

  const handleClick = () => {
    socket.emit(executeEvent)
  }

  socket.on(resultEvent, (data) => {
    setCommandResult(data)
  })

  return (
    <div>
      <button onClick={handleClick}>Run {command}</button>
      {commandResult && (
        <div>
          {commandResult.success ? (
            <p>Command executed successfully. Output: {commandResult.output}</p>
          ) : (
            <p>Error executing command: {commandResult.error}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default TerminalButton
