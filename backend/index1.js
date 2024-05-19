const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const fs = require('fs')
const { exec, execSync } = require('child_process')
const path = require('path')
const cors = require('cors')
const rosnodejs = require('rosnodejs')

const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, '../frontend/AI', 'dist')))
app.use('/static', express.static(path.join(__dirname, 'static')))

const FPS = 20

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/AI', 'dist', 'index.html'))
})

const server = http.createServer(app)
const io = socketIo(server)

let connectedClients = 0
let runningProcesses = {}

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
  await rosnodejs.initNode('/listener_node')

  const imu_listener = rosnodejs.nh.subscribe(
    '/imu',
    'sensor_msgs/Imu',
    (msg) => {
      io.emit('imu_data', msg)
    }
  )

  const imageSubscriber = rosnodejs.nh.subscribe(
    '/mobile_robot/camera1/image_raw',
    'sensor_msgs/Image',
    (data) => {
      const base64ImageData = Buffer.from(data.data).toString('base64')
      io.emit('image_data', base64ImageData)
    }
  )

  const gps_listener = rosnodejs.nh.subscribe(
    '/gps/fix',
    'sensor_msgs/NavSatFix',
    (msg) => {
      io.emit('ros_data', msg)
    }
  )
}

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

  const handleProcess = (event, command, resultEvent) => {
    if (runningProcesses[event]) {
      socket.emit(resultEvent, {
        success: false,
        error: `${event} is already running`,
      })
      return
    }

    const process = exec(command, { cwd: '../' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        socket.emit(resultEvent, { success: false, error: error.message })
      } else {
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        socket.emit(resultEvent, { success: true, output: stdout })
      }
      delete runningProcesses[event]
    })

    runningProcesses[event] = process
  }

  socket.on('rpilaunch', () =>
    handleProcess('rpilaunch', './bashes/test.sh', 'rpilaunchResult')
  )
  socket.on('roscore', () =>
    handleProcess('roscore', './bashes/jetson_roscore.sh', 'roscoreResult')
  )
  socket.on('jetsonsensor', () =>
    handleProcess('jetsonsensors', './bashes/jetson_sensor.sh', 'sensorResult')
  )
  socket.on('susensor', () =>
    handleProcess('susensor', './bashes/jetson_susensor.sh', 'susensorResult')
  )
  socket.on('planner', () =>
    handleProcess('planner', './bashes/planner.sh', 'plannerResult')
  )

  socket.on('update_data', (data) => {
    io.emit('sensor_data', data)
  })
})

const cleanup = () => {
  Object.values(runningProcesses).forEach((process) => process.kill('SIGINT'))
  runningProcesses = {}
}

process.on('SIGINT', () => {
  cleanup()
  process.exit()
})

process.on('SIGTERM', () => {
  cleanup()
  process.exit()
})

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
