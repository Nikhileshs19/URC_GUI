import { SpaceBar } from '@mui/icons-material'
import { LinearProgress } from '@mui/material'
import { Spacer } from '@nextui-org/react'
import React, { useState } from 'react'

const CoordinateList = () => {
  // State to manage the list of coordinates
  const [coordinates, setCoordinates] = useState([])
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

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
      {/* List of coordinates */}
      <div className=''>
        <div className='mb-2'>
          <h3>GPS Coordinates</h3>
          <Spacer y={1} />
          <hr />
        </div>
        <ul className='mb-4'>
          {coordinates.map((coord, index) => (
            <li key={index}>
              Latitude: {coord.latitude}, Longitude: {coord.longitude}
            </li>
          ))}
        </ul>
      </div>
      {/* Input fields for latitude and longitude */}
      <div className='flex justify-center mb-4 flex-col '>
        <input
          type='text'
          placeholder='Latitude'
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className='border rounded px-2 py-1 mr-2'
        />
        <input
          type='text'
          placeholder='Longitude'
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className='border rounded px-2 py-1 mr-2'
        />
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
