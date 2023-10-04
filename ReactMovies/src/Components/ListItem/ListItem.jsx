import React, { useContext, useEffect, useState } from 'react'
import './listItem.scss'
import axios from 'axios'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';


const ListItem = ({movie}) => {  
  const {user, dispatch} = useContext(AuthContext)

  const handleClick = async (movie) => {
    try {
      await axios.put(import.meta.env.VITE_BASE_URL + `/user/watchlist/${user._id}`, {
        movie, 
      })
      dispatch({type: 'ADD_FAV', payload: user._id})

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div key={movie.id} className='listItem'>
      <div className="cover" />
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='listImage'/>
        <span className='listTitle'>{movie.title}</span>
        <div className="itemDesc">
          <span>{movie.overview.slice(0, 100)}...</span>
        </div>
        <div className='itemInfo'>
          <Link to={`/${movie.id}`} className='link'>
           <InfoOutlinedIcon className='icon'/>
          </Link>
          <AddOutlinedIcon className='icon' onClick={()=> handleClick(movie.poster_path)}/>
          <ThumbUpOutlinedIcon className='icon'/>
          <ThumbDownOutlinedIcon className='icon'/>
        </div>
    </div>
  )
}

export default ListItem