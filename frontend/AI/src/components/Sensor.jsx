import { Spacer } from '@nextui-org/react'
import React from 'react'

const Sensor = () => {
  return (
    <div className='h-full grid grid-cols-2 grid-rows-5 border-white px-2'>
      <div className='border-b-2 border-white flex items-center justify-center'>
        Name
      </div>
      <div className='border-b-2 border-white flex items-center justify-center'>
        On
      </div>
      <div className='pt-2'>Button to on</div>
      <div className='pt-2'>Button to off</div>
      <div className='h-full col-span-2 row-span-3 border border-white pt-5'>
        Terminal
      </div>
    </div>
  )
}

export default Sensor
