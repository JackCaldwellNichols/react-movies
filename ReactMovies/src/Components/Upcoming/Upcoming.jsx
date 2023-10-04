import React, { useRef, useState, useEffect, useContext } from 'react'
import './upcoming.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '../ListItem/ListItem';
import { MovieContext } from '../../Context/MovieContext/MovieContext';

const Upcoming = () => {
const {upcoming, loading} = useContext(MovieContext)
const [slideNumber, setSlideNumber] = useState(0)
const [isMoved, setIsMoved] = useState(false)
const listRef = useRef()


const handleClick = (direction) => {
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 50
    if(direction === 'left' && slideNumber > 0){
        setSlideNumber(slideNumber - 1)
        listRef.current.style.transform = `translateX(${230 + distance}px)`
    }
    if(direction === 'right' && slideNumber < 12 ){
        setSlideNumber(slideNumber + 1)
        listRef.current.style.transform = `translateX(${-230 + distance}px)`
    }
}



  return (
    <div className='list'>
        <span className='listTitle'>Upcoming</span>
        <div className='wrapper'>
            <ChevronLeftIcon className='sliderArrow left' onClick={() => handleClick('left')} style={{display: !isMoved && "none"}}/>
            <div className='container' ref={listRef}>
            {upcoming?.map((movie) => (
                <ListItem movie={movie} key={movie.id}/>
            ))} 
            </div>
          <ChevronRightIcon className='sliderArrow right'onClick={() => handleClick('right')}/> 
        </div>
    </div>
  )
}

export default Upcoming