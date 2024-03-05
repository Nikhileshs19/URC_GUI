import React from 'react'

const SensorData = ({ data, name }) => {
  return (
    <div className=' text-2xl text-left pl-20'>
      {name} : {data}
    </div>
  )
}

export default SensorData
