import { useState, useEffect, React } from 'react'
import { io } from 'socket.io-client'
// socketIOClient,
import ProgressBar from './components/ProgressBar'
import { Switch } from '@nextui-org/react'
import ToggleSwitch from './components/ToggleSwitch'
import Image from './components/Image'
import CoordinateList from './components/CoordinateList'
import Sensor from './components/Sensor'
import logo from './images/MRM_logo.png'
import Buttons from './components/Buttons'
import CommandOutput from './components/CommandOutput'

const ENDPOINT = 'http://localhost:5000'
const socket = io('http://localhost:5000')

function App() {
  const [rosData, setRosData] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [imuData, setImuData] = useState(null)
  const [error, setError] = useState(false)
  // const [output, setOutput] = useState('')
  const [command, setCommand] = useState('')

  const [aidata, setAiData] = useState({
    accelerationX: 0,
    accelerationY: 0,
    accelerationZ: 0,
    roll: 0,
    pitch: 0,
    yaw: 0,
  })

  const [gpsData, setGpsData] = useState({
    latitude: 0,
    longitude: 0,
  })

  const [cmd, setCmd] = useState({
    linearX: 0,
    linearY: 0,
    linearZ: 0,
    angularX: 0,
    angularY: 0,
    angularZ: 0,
  })

  const handleButtonClick = (command) => {
    setCommand(command)
    socket.emit(command)
  }

  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT)

    socket.on('ros_data', (data) => {
      setRosData(data)
      console.log('Yasss')
    })

    socket.on('image_data', (base64ImageData) => {
      setImageSrc(base64ImageData)
      setError(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  const handleImageError = () => {
    setError(true) // Set error state if image fails to load
  }
  return (
    <div>
      <div className='h-screen w-screen grid grid-cols-6 grid-row-10 gap-2'>
        <div className='grid grid-cols-6 col-span-6 row-span-1 justify-center items-center b text-center m-0.5 gap-2'>
          <div className='border border-white h-full w-full flex justify-center items-center rounded-lg'>
            <Image
              title='y no work'
              src={logo}
              style={{
                width: '45%',
                position: 'relative',
              }}
            />
          </div>
          <ProgressBar />
          <div className='border border-white h-full w-full rounded-lg bg-zinc-800 shadow-md flex-col align-middle pt-2'>
            <h2 style={{ fontSize: '32px' }}>
              Current Latitude : {rosData.latitude}
            </h2>
            <h2 style={{ fontSize: '32px' }}>
              Current Longitude : {rosData.longitude}
            </h2>
          </div>
        </div>
        <div className='row-span-6 border border-white p-4 m-0.5 text-center rounded-lg bg-zinc-800 shadow-md'>
          <div className='text-3xl h-full text-green-500 justify-around flex-wrap p-2 rounded-lg bg-zinc-800 shadow-md text-left'>
            <div className='text-white border-b pb-5 mb-2'>Pings</div>
            <div>Base Transceiver : online</div>
            <div className='text-red-500'>NVR : Offline</div>
            <div>Rover Transceiver : Online</div>
            <div>Lan to UART : Online</div>
            <div>RPi-1 : Online</div>
            <div>RPi-2 : Online</div>
            <div>Jetson : Online</div>
          </div>
        </div>
        <div className='row-span-7 col-span-2 border border-white p-4 m-0.5 text-center rounded-lg bg-zinc-800 shadow-md'>
          <img src={imageSrc} alt='ROS Image Feed' />
        </div>
        <div className='row-span-7 col-span-2 border border-white p-4 m-0.5 text-center rounded-lg bg-zinc-800 shadow-md'>
          {/* <TerminalWindow /> */}
          <CommandOutput />
        </div>
        <div className='row-span-9 border border-white p-4 m-0.5 text-center rounded-lg bg-zinc-800 shadow-md'>
          <CoordinateList />
        </div>
        <div className='border border-white p-4 m-0.5 text-center row-span-2  rounded-lg bg-zinc-800 shadow-md'>
          <Buttons handleButtonClick={handleButtonClick} />
        </div>

        <div className='  border border-white p-4 m-0.5 text-center  row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor
            name='IMU'
            data={{
              first: aidata.accelerationX,
              second: aidata.accelerationY,
              third: aidata.accelerationZ,
            }}
            sensorName={{
              first: 'Acceleration X',
              second: 'Acceleration Y',
              third: 'Acceleration Z',
            }}
          />
        </div>
        <div className=' border border-white p-4 m-0.5 text-center row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor
            name='GPS'
            data={{
              first: rosData.latitude,
              second: rosData.longitude,
              third: rosData.altitude,
            }}
            sensorName={{
              first: 'Latitude',
              second: 'Longitude',
              third: 'Altitude',
            }}
          />
        </div>
        <div className=' border border-white p-4 m-0.5 text-center row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor
            name='LiDAR'
            data={{
              first: cmd.linearX.toFixed(4),
              second: cmd.linearY.toFixed(4),
              third: cmd.linearZ.toFixed(4),
            }}
            sensorName={{
              first: 'Linear X',
              second: 'Linear Y',
              third: 'Linear Z',
            }}
          />
        </div>
        <div className=' border border-white p-4 m-0.5 text-center row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor
            name='Camera'
            data={{
              first: cmd.angularX.toFixed(4),
              second: cmd.angularY.toFixed(4),
              third: cmd.angularZ.toFixed(4),
            }}
            sensorName={{
              first: 'Angular X',
              second: 'Angular Y',
              third: 'Angular Z',
            }}
          />
        </div>
        <div className='border h-full border-white p-4  text-center flex justify-center align-middle content-center rounded-lg bg-zinc-800 shadow-md'>
          <Switch defaultSelected color='danger'></Switch>
          <ToggleSwitch />
        </div>
      </div>
    </div>
  )
}

export default App
