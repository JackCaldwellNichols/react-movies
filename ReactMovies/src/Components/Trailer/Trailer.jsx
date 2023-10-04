import React from 'react'
import YouTube from 'react-youtube';
import './trailer.scss'
import zIndex from '@mui/material/styles/zIndex';
const Trailer = ({ videoId}) => {

  return (
    <YouTube
    videoId={videoId} 
    className='trailerWrapper'
    
    opts={{
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1
        }
    }}
    
  />
  )
}

export default Trailer