const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
// const io = require('socket.io')(3001)

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

let sensorData = {
  gps: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  },
  imu: {
    x: 0,
    y: 0,
    z: 0,
  },
  lidar: {
    minData: 0,
  },
}

async function main() {
  // Initialize ROS node
  await rosnodejs.initNode('/listener_node')

  const imu_listener = rosnodejs.nh.subscribe(
    '/imu',
    'sensor_msgs/Imu',
    (msg) => {
      // console.log('Received message:', msg)
      // Emit the received message to the Socket.IO clients
      io.emit('imu_data', msg)
    }
  )

  const imageSubscriber = rosnodejs.nh.subscribe(
    '/mobile_robot/camera1/image_raw',
    'sensor_msgs/Image',
    (data) => {
      const base64ImageData = Buffer.from(data.data).toString('base64')

      // Emit the base64 image data over Socket.IO
      io.emit('image_data', base64ImageData)
    }
  )

  // Create a subscriber to the ROS topic
  const gps_listener = rosnodejs.nh.subscribe(
    '/gps/fix',
    'sensor_msgs/NavSatFix',
    (msg) => {
      console.log('Received message:', msg)
      // Emit the received message to the Socket.IO clients
      io.emit('ros_data', msg)
    }
  )
}

let roscoreProcess = null

main().catch(console.error)

io.on('connection', (socket) => {
  connectedClients++
  console.log(`Client connected. Total connected clients: ${connectedClients}`)

  socket.on('disconnect', () => {
    connectedClients--
    console.log(
      `Client disconnected. Total connected clients: ${connectedClients}`
    )
  })

  socket.on('rpilaunch', () => {
    const directoryPath = '../' // Change this to your desired directory
    const command = './bashes/rpi_launch.sh'
    // const command = 'ls'

    // Execute the command with the specified directory as the working directory
    exec(command, { cwd: directoryPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        socket.emit('rpilaunchResult', { success: false, error: error.message })
      } else {
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        console.log('Command executed successfully')
        socket.emit('rpilaunchResult', { success: true, output: stdout })
      }
    })
  })

  socket.on('roscore', () => {
    const directoryPath = '../' // Change this to your desired directory
    const command = './bashes/jetson_roscore.sh'

    // Execute the command with the specified directory as the working directory
    exec(command, { cwd: directoryPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        socket.emit('roscoreResult', { success: false, error: error.message })
      } else {
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        socket.emit('roscoreResult', { success: true, output: stdout })
      }
    })
  })

  socket.on('jetsonsensor', () => {
    const directoryPath = '../' // Change this to your desired directory
    const command = './bashes/jetson_sensor.sh'

    // Execute the command with the specified directory as the working directory
    exec(command, { cwd: directoryPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        socket.emit('sensorResult', { success: false, error: error.message })
      } else {
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        socket.emit('sensorResult', { success: true, output: stdout })
      }
    })
  })

  socket.on('susensor', () => {
    const directoryPath = '../' // Change this to your desired directory
    const command = './bashes/jetson_susensor.sh'

    // Execute the command with the specified directory as the working directory
    exec(command, { cwd: directoryPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        socket.emit('susensorResult', { success: false, error: error.message })
      } else {
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        socket.emit('susensorResult', { success: true, output: stdout })
      }
    })
  })

  socket.on('planner', () => {
    const directoryPath = '../' // Change this to your desired directory
    const command = './bashes/planner.sh'

    // Execute the command with the specified directory as the working directory
    exec(command, { cwd: directoryPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        socket.emit('plannerResult', { success: false, error: error.message })
      } else {
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        socket.emit('plannerResult', { success: true, output: stdout })
      }
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
