const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const cors = require('cors')
const { spawn } = require('child_process')
const rosnodejs = require('rosnodejs') // Import rosnodejs module

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
const csv = require('csv-parser')

const results = []
const results1 = []
const results2 = []

let isHeaderLine = true // Flag to track header lines

let rowIndex = 0 // Initialize row index counter

fs.readFile('./csvs/mallet_imu_ong.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  // Split the file data into rows
  const rows = data.trim().split('\n')

  // Process each row
  rows.forEach((row, index) => {
    // Split the row by commas to get individual values
    const values = row.trim().split(',')

    // Parse values into variables
    const accelerationX = parseFloat(values[0])
    const accelerationY = parseFloat(values[1])
    const accelerationZ = parseFloat(values[2])
    const roll = parseFloat(values[3])
    const pitch = parseFloat(values[4])
    const yaw = parseFloat(values[5])
    // const latitude = parseFloat(values[6])
    // const longitude = parseFloat(values[7])

    // Construct the data object
    const dataObject = {
      accelerationX,
      accelerationY,
      accelerationZ,
      roll,
      pitch,
      yaw,
      // latitude,
      // longitude,
    }

    // Push the data object into the results array
    results.push(dataObject)
  })
  // console.log(results.length)
  console.log('IMU file processing completed')

  // Emit each data object from the results array at a custom rate
  let currentIndex = 0
  const interval = setInterval(() => {
    if (currentIndex < results.length) {
      // const socket = socketIOClient(ENDPOINT)
      // console.log('Yessir')
      io.emit('dataUpdate', results[currentIndex])
      currentIndex++
    } else {
      clearInterval(interval) // Stop the interval when all data has been emitted
    }
  }, 14000 / results.length)
})

fs.readFile('./csvs/mallet_cmd_real.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  // Split the file data into rows
  const rows = data.trim().split('\n')
  console.log(rows.length)

  // Process each row
  rows.forEach((row, index) => {
    // Split the row by commas to get individual values
    const values = row.trim().split(',')

    // Parse values into variables
    const linearX = parseFloat(values[0])
    const linearY = parseFloat(values[1])
    const linearZ = parseFloat(values[2])
    const angularX = parseFloat(values[3])
    const angularY = parseFloat(values[4])
    const angularZ = parseFloat(values[5])

    // Construct the data object
    const dataObject = {
      linearX,
      linearY,
      linearZ,
      angularX,
      angularY,
      angularZ,
    }

    // Push the data object into the results array
    results1.push(dataObject)
  })
  console.log(results1.length)
  console.log('CMD file processing completed')

  // Emit each data object from the results array at a custom rate
  let currentIndex = 0
  const interval = setInterval(() => {
    if (currentIndex < results1.length) {
      // const socket = socketIOClient(ENDPOINT)
      // console.log('Yessir')
      io.emit('dataUpdate1', results1[currentIndex])
      currentIndex++
    } else {
      clearInterval(interval) // Stop the interval when all data has been emitted
    }
  }, 14000 / results1.length)
})

fs.readFile('./csvs/mallet_gps_real.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  // Split the file data into rows
  const rows = data.trim().split('\n')
  console.log(rows.length)

  // Process each row
  rows.forEach((row, index) => {
    // Split the row by commas to get individual values
    const values = row.trim().split(',')

    // Parse values into variables
    const latitude = parseFloat(values[0])
    const longitude = parseFloat(values[1])

    // Construct the data object
    const dataObject = {
      latitude,
      longitude,
    }

    // Push the data object into the results array
    results2.push(dataObject)
  })
  console.log(results2.length)
  console.log('GPS file processing completed')

  // Emit each data object from the results array at a custom rate
  let currentIndex = 0
  const interval = setInterval(() => {
    if (currentIndex < results2.length) {
      // const socket = socketIOClient(ENDPOINT)
      // console.log('Yessir')
      io.emit('dataUpdate2', results2[currentIndex])
      currentIndex++
    } else {
      clearInterval(interval) // Stop the interval when all data has been emitted
    }
  }, 14000 / results2.length)
})

io.on('connection', (socket) => {
  connectedClients++
  console.log(`Client connected. Total connected clients: ${connectedClients}`)

  socket.on('disconnect', () => {
    connectedClients--
    console.log(
      `Client disconnected. Total connected clients: ${connectedClients}`
    )
  })

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

  const rostopicEcho = spawn('rostopic', ['echo', '/camera_image/image_raw'])
  const outputBuffer = [] // Buffer to store the latest output lines

  rostopicEcho.stdout.on('data', (data) => {
    const outputLines = data.toString().split('\n')
    const latestLines = outputLines.slice(-20) // Get the last 20 lines
    const formattedOutput = latestLines.join('\n')
    console.log(formattedOutput)
    socket.emit('rostopic-data', formattedOutput)
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

  // Handle 'update_data' event
  socket.on('update_data', (data) => {
    io.emit('sensor_data', data)
  })
})

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
