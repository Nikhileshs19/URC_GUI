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

socket.on('imuData', (data) => {
  setImuData(data)
})

socket.on('dataUpdate2', (updatedData) => {
  setGpsData(updatedData)
  // console.log(updatedData)
})

socket.on('dataUpdate1', (updatedData1) => {
  setCmd(updatedData1)
  console.log(updatedData1)
})

socket.on('dataUpdate', (updatedData) => {
  setAiData(updatedData)
  // console.log(updatedData)
})




<div className='h-screen w-screen grid grid-cols-6 grid-row-10 gap-2'>
        <div className='grid grid-cols-6 col-span-6 row-span-1 justify-center items-center b text-center m-0.5 gap-2'>
          <div className='border border-white h-full w-full flex justify-center items-center'>
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
              Current Latitude : {gpsData.latitude}
            </h2>
            <h2 style={{ fontSize: '32px' }}>
              Current Longitude : {gpsData.longitude}
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
          Camera Feed
        </div>
        <div className='row-span-7 col-span-2 border border-white p-4 m-0.5 text-center rounded-lg bg-zinc-800 shadow-md'>
          {/* <TerminalWindow /> */}
          ROS Logs
        </div>
        <div className='row-span-9 border border-white p-4 m-0.5 text-center rounded-lg bg-zinc-800 shadow-md'>
          <CoordinateList />
        </div>
        <div className='border border-white p-4 m-0.5 text-center row-span-2  rounded-lg bg-zinc-800 shadow-md'>
          <Buttons />
          {/* <Button variant='outlined' size='large'>
            Launch
          </Button> */}
          {/* <Button size='lg' radius='lg' variant='ghost'>
            Launch
          </Button> */}
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
          {/* Hi */}
        </div>
        <div className=' border border-white p-4 m-0.5 text-center row-span-2 rounded-lg bg-zinc-800 shadow-md'>
          <Sensor
            name='GPS'
            data={{
              first: aidata.roll,
              second: aidata.pitch,
              third: aidata.yaw,
            }}
            sensorName={{
              first: 'Roll',
              second: 'Pitch',
              third: 'Yaw',
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


















/* <div>
        <h1>Latitude: {rosData.latitude}</h1>
        <h1>Longitude: {rosData.longitude}</h1>
        <h1>Altitude: {rosData.altitude}</h1>
      </div> */}
      <h1>ROS Image Display</h1>
      {error ? (
        <p>Error loading image</p>
      ) : (
        <img
          src={`data:image/jpeg;base64,${imageSrc}`} // Assuming JPEG format, adjust as needed
          alt='ROS Image'
          onError={handleImageError}
        />
      )}



<div className='h-screen w-screen grid grid-cols-6 grid-row-10 gap-2'>
        <div className='grid grid-cols-6 col-span-6 row-span-1 justify-center items-center b text-center m-0.5 gap-2'>
          <div className='border border-white h-full w-full flex justify-center items-center'>
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
          ROS Logs
        </div>
        <div className='row-span-9 border border-white p-4 m-0.5 text-center rounded-lg bg-zinc-800 shadow-md'>
          <CoordinateList />
        </div>
        <div className='border border-white p-4 m-0.5 text-center row-span-2  rounded-lg bg-zinc-800 shadow-md'>
          <Buttons />
          {/* <Button variant='outlined' size='large'>
            Launch
          </Button> */}
          {/* <Button size='lg' radius='lg' variant='ghost'>
            Launch
          </Button> */}
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
          {/* Hi */}
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
              first: 'Roll',
              second: 'Pitch',
              third: 'Yaw',
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