import React from 'react'
import './search.scss'
import Nav from '../../Components/Navbar/Nav'

const Search = () => {
  return (
    <div className='search'>
      <Nav />
        <div className="searchWrapper">
        <div className="top">
        <h1 className='saerchTitle'>Search for your title</h1>
            <input type='search'/>

        </div>
        <div className='results'>

        </div>
        </div>
    </div>
  )
}

export default Search