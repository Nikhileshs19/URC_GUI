import React from 'react'
import Terminal from 'react-terminal-ui'

const TerminalWindow = () => {
  const commands = {
    greet: () => 'Hello, world!',
    date: () => new Date().toString(),
  }
  const myCustomTheme = {
    background: '#282c34',
    promptSymbolColor: '#61dafb',
    commandColor: '#61dafb',
    outputColor: '#ffffff',
  }
  return <div>{<Terminal commands={commands} theme={myCustomTheme} />}</div>
}

export default TerminalWindow
