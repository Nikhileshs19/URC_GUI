import { Button, Spacer } from '@nextui-org/react'
import React from 'react'
import SensorData from './SensorData'

const Sensor = ({ name, data, sensorName }) => {
  return (
    <div className='grid grid-rows-5'>
      <div className='row-span-2 grid grid-cols-2 grid-rows-2 pb-5 border-white px-2 border-2'>
        <div className='border-b-2 border-white flex items-center justify-center text-2xl'>
          {name}
        </div>
        <div className='border-b-2 border-white flex items-center justify-center text-green-400 text-2xl'>
          Status
        </div>
        <div className='pt-3'>
          <Button style={{ backgroundColor: '#424242', width: '120px' }}>
            On
          </Button>
        </div>
        <div className='pt-3'>
          <Button style={{ backgroundColor: '#424242', width: '120px' }}>
            Off
          </Button>
        </div>
      </div>
      <div className='h-full row-span-3 border border-white pt-5 mt-2'>
        <SensorData data={data.first} name={sensorName.first} />
        <SensorData data={data.second} name={sensorName.second} />
        <SensorData data={data.third} name={sensorName.third} />
      </div>
    </div>
  )
}

export default Sensor
