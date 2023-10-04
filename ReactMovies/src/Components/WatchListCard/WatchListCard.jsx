import React, { useContext, useEffect, useState } from 'react'
import './watchListCard.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

import axios from 'axios';

const WatchListCard = ({movie}) => {  
  const {user, dispatch} = useContext(AuthContext)


const handleClick = async (movie) => {
  try {
    await axios.put(import.meta.env.VITE_BASE_URL + `/user/watchlistRemove/${user._id}`, {
      movie, 
    })
    dispatch({type: 'REMOVE_FAV', payload: user._id})
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

  return (

    <div className='listItem'>
      <div className="cover" />
        <img src={`https://image.tmdb.org/t/p/w500/${movie}`} alt="" className='listImage'/>
        <div className='itemInfo'>
            <DeleteIcon className='icon'onClick={()=> handleClick(movie)}/>
        </div>
    </div>
  )
}

export default WatchListCard