import React, { useContext, useEffect, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Trailer from '../Trailer/Trailer';
import './featured.scss'
import { MovieContext } from '../../Context/MovieContext/MovieContext';
import { Link } from 'react-router-dom';

const Featured = ({type}) => {
  const {upcoming, isLoading} = useContext(MovieContext)
  const [trailerPlay, setTrailerPlay] = useState(false)
  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(false)

 


 
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/238?language=en-US&append_to_response=videos`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TOKEN
      }
     };

     fetch(url, options)
      .then(res => res.json())
      .then(json => setMovie(json))
      .catch(err => console.error('error:' + err + setLoading(false)));
      
     }, [])

     const renderTrailer = () => {
      const trailer = movie.videos.results[0]
       return (
           <Trailer videoId={trailer.key}  />
      )
   }

  return (
    <>
      {isLoading ? 
      ( 
        <div className='featured'>
        <span style={{color: 'white'}}>Loading</span>
        </div>
      ) : (
        <div className='featured'>
        {type && (
            <div className="category">
                <span>
                    {type === 'movie' ? "Movies" : "Series"}
                </span>
                <select name="genre" id="genre">
                    <option>Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                    <option value="documentary">Documentary</option>
                </select>
            </div>
        )}
        <div className='imgContainer'>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
            {movie.videos && trailerPlay ? renderTrailer() : null}   
            {trailerPlay && <button className='close' onClick={()=>setTrailerPlay(false)}>
                 <CloseOutlinedIcon className='closeIcon'/>
            </button>}
        </div>
     <div className='info'>
        <h1>{movie.title}</h1>
        <span className='desc'>{movie?.overview}</span>
        <div className='buttons'> 
          <button className='play' onClick={()=>setTrailerPlay(true)}>
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <Link to={`/${movie?.id}`} className='link'>
            <button className='more'>
              <InfoOutlinedIcon />
              <span>Info</span>
            </button>
          </Link>
        </div>
       </div>
       </div>
        )}
    </>
  )
}

export default Featured