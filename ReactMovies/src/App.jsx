import {BrowserRouter, Routes, Route, } from 'react-router-dom'

import './App.scss'
import Home from './Pages/Home/Home'
import Single from './Pages/SinglePage/Single'
import Search from './Pages/Search/Search'
import Settings from './Pages/Settings/Settings'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import { useContext } from 'react'
import { AuthContext } from './Context/AuthContext/AuthContext'


function App() {
  const {user} = useContext(AuthContext)

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home /> } />
          <Route path='/movies' element={user ? <Home type='movie'/> : <Register />} />
          <Route path='/series' element={user ? <Home type='series'/> : <Register />} />
          <Route path='/:id' element={user ? <Single /> : <Register />} />
          <Route path='/search' element={user ? <Search /> : <Register />} />
          <Route path='/settings/:id' element={user ? <Settings /> : <Register />} />
          <Route path='/login' element={!user ? <Login /> : <Home />} />
          <Route path='/register' element={!user ? <Register /> : <Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
