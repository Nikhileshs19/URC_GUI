import { SpaceBar } from '@mui/icons-material'
import { LinearProgress } from '@mui/material'
import { Spacer } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'

const CoordinateList = () => {
  // State to manage the list of coordinates
  const [coordinates, setCoordinates] = useState([])
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [isTimeElapsed, setIsTimeElapsed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeElapsed(true)
    }, 14500) // 20 seconds

    return () => clearTimeout(timer) // Cleanup the timer
  }, [])

  // Function to handle adding coordinates to the list
  const handleAddCoordinate = () => {
    // Only add coordinates if both latitude and longitude are provided
    if (latitude && longitude) {
      setCoordinates([...coordinates, { latitude, longitude }])
      // Clear input fields after adding coordinates
      setLatitude('')
      setLongitude('')
    }
  }

  return (
    <div className='flex flex-col justify-between jus h-full'>
      <div className=''>
        <div className='mb-2'>
          <h2 style={{ fontSize: '30px' }}>GPS Coordinates</h2>
          <Spacer y={1} />
          <hr />
        </div>
        <ul className='mb-4'>
          <li className={`py-4 mt-4 border-2 border-green-500`}>
            <div>
              <span className='font-semibold'>Latitude:</span>{' '}
              <span className='ml-1'>13.3478638</span>,{' '}
              <span className='font-semibold ml-2'>Longitude:</span>{' '}
              <span className='ml-1'>74.7921448</span>
              <Spacer y={1} />
            </div>
          </li>
          <li className={`py-4 mt-4 border-2 border-green-500`}>
            <div>
              <span className='font-semibold'>Latitude:</span>{' '}
              <span className='ml-1'>13.3478264</span>,{' '}
              <span className='font-semibold ml-2'>Longitude:</span>{' '}
              <span className='ml-1'>74.7921879</span>
              <Spacer y={1} />
            </div>
          </li>
          <li className={`py-4 mt-4 border-2 border-green-500`}>
            <div>
              <span className='font-semibold'>Latitude:</span>{' '}
              <span className='ml-1'>13.347865</span>,{' '}
              <span className='font-semibold ml-2'>Longitude:</span>{' '}
              <span className='ml-1'>74.7921144</span>
              <Spacer y={1} />
            </div>
          </li>
          <li className={`py-4 mt-4 border-2 border-green-500`}>
            <div>
              <span className='font-semibold'>Latitude:</span>{' '}
              <span className='ml-1'>13.3478714</span>,{' '}
              <span className='font-semibold ml-2'>Longitude:</span>{' '}
              <span className='ml-1'>74.7921278</span>
              <Spacer y={1} />
            </div>
          </li>
          <li className={`py-4 mt-4 border-2 border-green-500`}>
            <div>
              <span className='font-semibold'>Latitude:</span>{' '}
              <span className='ml-1'>13.3499157</span>,{' '}
              <span className='font-semibold ml-2'>Longitude:</span>{' '}
              <span className='ml-1'>74.7916054</span>
              <Spacer y={1} />
            </div>
          </li>
          <li
            className={`py-4 mt-4 border-2 ${
              isTimeElapsed ? 'border-green-500' : 'border-gray-400'
            }`}>
            <div>
              <span className='font-semibold'>Latitude:</span>{' '}
              <span className='ml-1'>13.3499157</span>,{' '}
              <span className='font-semibold ml-2'>Longitude:</span>{' '}
              <span className='ml-1'>74.7916054</span>
              <Spacer y={1} />
            </div>
          </li>
        </ul>
        <ul className='mb-4'>
          {coordinates.map((coord, index) => (
            <li key={index} className='py-4 mt-4 border-2 border-gray-400'>
              <div>
                <span className='font-semibold'>Latitude:</span>{' '}
                <span className='ml-1'>{coord.latitude}</span>,{' '}
                <span className='font-semibold ml-2'>Longitude:</span>{' '}
                <span className='ml-1'>{coord.longitude}</span>
                <Spacer y={1} />
              </div>
              {/* <button
                className='p-1 text-gray-500 hover:text-red-500 focus:outline-none'
                onClick={() => handleDelete(index)}>
                <TrashIcon className='w-6 h-6' />
              </button> */}
            </li>
          ))}
        </ul>
      </div>
      {/* Input fields for latitude and longitude */}
      <div className='flex justify-center mb-4 flex-col p-2'>
        <input
          type='text'
          placeholder='Latitude'
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className='border rounded px-2 py-1 mr-2 w-full'
        />
        <Spacer x={2} />
        <input
          type='text'
          placeholder='Longitude'
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className='border rounded px-2 py-1 mr-2 w-full'
        />
        <Spacer x={2} />
        <button
          onClick={handleAddCoordinate}
          className='bg-blue-500 text-white px-3 py-1 rounded'>
          Add
        </button>
      </div>

      {/* Button to add coordinates */}
    </div>
  )
}

export default CoordinateList
