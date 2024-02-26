const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const cors = require('cors')
const { spawn } = require('child_process')
// const cv = require('node-opencv')

const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, '../frontend/AI', 'dist')))

app.use('/static', express.static(path.join(__dirname, 'static')))

const FPS = 20
// const camera = new cv.VideoCapture(0)

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/AI', 'dist', 'index.html'))
})

// Create HTTP server
const server = http.createServer(app)
const io = socketIo(server)

let connectedClients = 0

io.on('connection', (socket) => {
  connectedClients++
  console.log(`Client connected. Total connected clients: ${connectedClients}`)

  socket.on('disconnect', () => {
    connectedClients--
    console.log(
      `Client disconnected. Total connected clients: ${connectedClients}`
    )
  })

  // setInterval(() => {
  //   camera.read((err, frame) => {
  //     if (!err && !frame.empty()) {
  //       const imageBuffer = cv.Matrix.encodeAsArray(frame, 'jpg')
  //       io.emit('videoFrame', imageBuffer)
  //     }
  //   })
  // }, 1000 / FPS)

  socket.on('executels', () => {
    const directoryPath = '../frontend/' // Change this to your desired directory
    const command = 'ls'

    // Execute the command with the specified directory as the working directory
    exec(command, { cwd: directoryPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        socket.emit('commandResult', { success: false, error: error.message })
      } else {
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        socket.emit('lsResult', { success: true, output: stdout })
      }
    })
  })

  socket.on('executepwd', () => {
    const directoryPath = '../' // Change this to your desired directory
    const command = './bashes/test.sh'

    // Execute the command with the specified directory as the working directory
    exec(command, { cwd: directoryPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        socket.emit('commandResult', { success: false, error: error.message })
      } else {
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        socket.emit('pwdResult', { success: true, output: stdout })
      }
    })
  })

  io.on('connection', (socket) => {
    const rostopicEcho = spawn('rostopic', ['echo', '/your/topic'])
    const outputBuffer = [] // Buffer to store the latest output lines

    rostopicEcho.stdout.on('data', (data) => {
      // Push new data to the buffer
      outputBuffer.push(data.toString())

      // Keep only the last 20 lines in the buffer
      if (outputBuffer.length > 20) {
        outputBuffer.shift() // Remove the oldest line
      }

      // Send the latest 20 lines to the client
      socket.emit('rostopic-data', outputBuffer.join(''))
    })

    rostopicEcho.stderr.on('data', (data) => {
      // Handle any errors
      console.error(`Error: ${data}`)
    })

    rostopicEcho.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })

    socket.on('disconnect', () => {
      // Clean up the spawned process when the client disconnects
      rostopicEcho.kill()
    })
  })

  // Handle 'update_data' event
  socket.on('update_data', (data) => {
    io.emit('sensor_data', data)
  })
})

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
