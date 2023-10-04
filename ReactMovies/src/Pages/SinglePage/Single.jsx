import React, { useEffect, useState,  } from 'react'
import { useLocation, Link } from 'react-router-dom';
import './single.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Trailer from '../../Components/Trailer/Trailer';
import logo from '../../assets/newLogo.png'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Rating } from '@mui/material';
import ListItem from '../../Components/ListItem/ListItem';
import Nav from '../../Components/Navbar/Nav';
import Footer from '../../Components/Footer/Footer';


const Single = () => {
const path = useLocation()
const movie_id = path.pathname.split('/')[1]
const [movie, setMovie] = useState([])
const [credits, setCredits] = useState([])
const [similar, setSimilar] = useState([])
const [trailerPlay, setTrailerPlay] = useState(false)
const rating = []

useEffect(() => {
    window.scrollTo(0, 0)
  }, [movie_id, movie])


useEffect(() => {
const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US&append_to_response=videos`;
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
   
   .catch(err => console.error('error:' + err));
 }, [movie_id])


 useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TOKEN
  }
 };

 fetch(url, options)
  .then(res => res.json())
   .then(json => setCredits(json))
   .catch(err => console.error('error:' + err));
 }, [movie_id])

 useEffect(() => {
    const url = `
    https://api.themoviedb.org/3/movie/${movie_id}/similar`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TOKEN
  }
 };

 fetch(url, options)
  .then(res => res.json())
   .then(json => setSimilar(json))
   .catch(err => console.error('error:' + err));
 }, [movie_id])
  

const rater = () => {
    rating.push(Math.floor(movie.vote_average) / 2)
}

rater()


 const renderTrailer = () => {
    const trailer = movie.videos.results.find(
            (vid) => vid.name.includes("Trailer")
        )
     return (
         <Trailer videoId={trailer.key}  />
    )
 }

  return (
    <div className='single'>
              <Nav />
        <div className='imgContainer'>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
            {movie.videos && trailerPlay ? renderTrailer() : null}   
            {trailerPlay && <button className='close' onClick={()=>setTrailerPlay(false)}>
                 <CloseOutlinedIcon className='closeIcon'/>
            </button>}
        </div>
        <div className='info'>
            <img src={logo} alt='logo' className='logo'/>
            <h1 className='movieTitle'>{movie.title}</h1> 
            <div className='ratingArray'>
            <Rating
                name="simple-controlled"
                value={rating}
                precision={0.5}
                />
            </div>
            <span>{movie?.release_date?.split('-')[0]}</span>
            <span className='desc'>{movie.overview}</span>
            <div className='buttons'> 
                <button className='play' onClick={()=>setTrailerPlay(true)}>
                    <PlayArrowIcon />
                    <span>Play Trailer</span>
                </button>
                <Link to='/' className='link'>
                <button className='play'>
                    <ArrowBackOutlinedIcon />
                    <span>Back</span>
                </button>
                </Link>
            </div>
            <span className='genres'>
                {movie?.genres?.map((genre, i) => (
                    <span className='genre' key={i}>· {genre.name}</span>
                ))}
            </span>
        </div>
        <div className='details'>
            <h1>Cast</h1>
            <div className='castList'>
           
                 {credits?.cast?.slice(0, 10).map((credit) => (
                    <div className='castContainer' key={credit.id}>
                        <img src={credit.profile_path ? `https://image.tmdb.org/t/p/w200${credit.profile_path}` : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} alt="" className='castImg' />
                        <span className='creditName'>{credit.name}</span>
                    </div>
                ))}

            </div>
            <h1>Information</h1>
            <div className='movieInfo'>
                <h3>Tagline</h3>
                <p>{movie.tagline}</p>
                <h3>Movie Overview</h3>
                <p>{movie.overview}</p>
                <h3>Release Date</h3>
                <p>{movie?.release_date?.split('-')[0]}</p>
                <h3>Run Time</h3>
                <p>{movie.runtime} minutes</p>
                <h3>Status</h3>
                <p>{movie.status}</p>
            </div>
            <h1>You May Like...</h1>
            <div className='similarList'>
                 {similar?.results?.slice(0, 7).map((sim) => (
                    <ListItem movie={sim} key={sim.id}/>
                ))}

            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Single