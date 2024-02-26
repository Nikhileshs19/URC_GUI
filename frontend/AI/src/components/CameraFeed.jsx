// import React, { useEffect, useRef } from 'react'
// import socketIOClient from 'socket.io-client'

// const ENDPOINT = 'http://localhost:3001'
// const socket = socketIOClient(ENDPOINT)

// const CameraFeed = () => {
//   const videoRef = useRef(null)

//   useEffect(() => {
//     socket.on('videoFrame', (imageBuffer) => {
//       const imageUrl = `data:image/jpeg;base64,${imageBuffer}`
//       videoRef.current.src = imageUrl
//     })

//     return () => {
//       socket.disconnect()
//     }
//   }, [])

//   return (
//     <div>
//       <h1>Rover Camera Feed</h1>
//       <video ref={videoRef} autoPlay></video>
//     </div>
//   )
// }

// export default CameraFeed
