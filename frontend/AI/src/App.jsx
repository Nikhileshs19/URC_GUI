import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import TerminalButton from './components/TerminalButton'
import ProgressBar from './components/ProgressBar'
import { Progress, Spacer } from '@nextui-org/react'
import LinearProgress from '@mui/material/LinearProgress'
import { Switch } from '@nextui-org/react'
import ToggleSwitch from './components/ToggleSwitch'
import Image from './components/Image'
import CoordinateList from './components/CoordinateList'
import TerminalWindow from './components/TerminalWindow'
import Sensor from './components/Sensor'
// import CameraFeed from './components/CameraFeed'
import logo from './images/MRM_logo.png'
//import { Button } from '@mui/material'
import { Button, ButtonGroup } from '@nextui-org/react'
import Buttons from './components/Buttons'

function App() {
  return (
    // <ToggleSwitch />
    // <div className='h-screen w-screen'>
    //   <Image
    //     title='y no work'
    //     src='./MRM_logo.png'
    //     // style={{
    //     //   width: '30%',
    //     //   position: 'relative',
    //     //   top: '3%',
    //     //   left: '5%',
    //     // }}
    //   />
    // </div>
    // <progress className='progress w-56' value={40} max={100} />
    // <LinearProgress variant='determinate' value={50} />
    <div>
      <div className='h-screen w-screen grid grid-cols-6 grid-row-10 gap-2'>
        <div className='grid grid-cols-6 col-span-6 row-span-1 justify-center items-center border border-white text-center m-0.5 gap-2'>
          <div className='border border-white h-full w-full flex justify-center items-center'>
            <Image
              title='y no work'
              src={logo}
              style={{
                width: '45%',
                position: 'relative',
                // top: '3%',
                // left: '5%',
              }}
            />
          </div>
          <ProgressBar />
          <div className='border border-white h-full w-full'>idk</div>
        </div>
        <div className='row-span-6 border border-white p-4 m-0.5 text-center'>
          <div className='text-3xl text-green-500 justify-around flex-wrap p-2'>
            <div>Pings</div>
            <Spacer y={1} />
            <div>Base Transceiver : online</div>
            <div>NVR : online</div>
            <div>Rover Transceiver : online</div>
            <div>Lan to UART : online</div>
            <div>RPi-1 : online</div>
            <div>RPi-2 : online</div>
            <div>Jetson : online</div>
          </div>
        </div>
        <div className='row-span-7 col-span-2 border border-white p-4 m-0.5 text-center'>
          {/* <CameraFeed /> */}
          Smn
        </div>
        <div className='row-span-7 col-span-2 border border-white p-4 m-0.5 text-center'>
          {/* <TerminalWindow /> */}
          Smn1
        </div>
        <div className='row-span-9 border border-white p-4 m-0.5 text-center'>
          <CoordinateList />
        </div>
        <div className='border border-white p-4 m-0.5 text-center row-span-2'>
          <Buttons />
          {/* <Button variant='outlined' size='large'>
            Launch
          </Button> */}
          {/* <Button size='lg' radius='lg' variant='ghost'>
            Launch
          </Button> */}
        </div>

        <div className='  border border-white p-4 m-0.5 text-center  row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor />
          {/* Hi */}
        </div>
        <div className=' border border-white p-4 m-0.5 text-center row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor />
        </div>
        <div className=' border border-white p-4 m-0.5 text-center row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor />
        </div>
        <div className=' border border-white p-4 m-0.5 text-center row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor />
        </div>
        <div className='border h-full border-white p-4 m-0.5 text-center flex justify-center align-middle content-center'>
          <Switch defaultSelected color='danger'></Switch>
          <ToggleSwitch />
        </div>
      </div>
    </div>
  )
}

export default App
