import React from 'react'
import './home.scss'
import Nav from '../../Components/Navbar/Nav'
import Footer from '../../Components/Footer/Footer'
import Featured from '../../Components/Featured/Featured'
import MovieList from '../../Components/MovieList/MovieList'
import TopRated from '../../Components/Toprated/TopRated'
import Upcoming from '../../Components/Upcoming/Upcoming'

const Home = ({type}) => {
  return (
    <div className='home'>
      <Nav />
      <Featured type={type}/>
      <MovieList />
      <TopRated />
      <Upcoming />
      <Footer />
    </div>
  )
}

export default Home  