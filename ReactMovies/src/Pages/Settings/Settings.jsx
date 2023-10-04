import React, { useContext, useEffect, useState } from 'react'
import './settings.scss'
import { AuthContext } from '../../Context/AuthContext/AuthContext'
import Nav from '../../Components/Navbar/Nav'
import Footer from '../../Components/Footer/Footer'
import axios from 'axios'
import WatchListCard from '../../Components/WatchListCard/WatchListCard'
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import { update } from '../../Context/AuthContext/APICalls'
import {useNavigate} from 'react-router-dom'
import { logout } from '../../Context/AuthContext/AuthActions'



const Settings = () => {

  const {user, dispatch} = useContext(AuthContext)



const [watchlist, setWatchlist] = useState([user.watchlist])
const [userName, setUserName] = useState(user.username)
const [success, setSuccess] = useState(null)
const [loading, setLoading] = useState(null)
const [email, setEmail] = useState(user.email)
const [password, setPassword] = useState('')
const [file, setFile] = useState(0)
const id = user._id


useEffect(() => {
  const getWatchlist = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + `/user/profile/${user._id}`)
      setWatchlist(res.data.watchlist)
      setUserName(res.data.username)
      setEmail(res.data.email)
      setWatchlist(res.data.watchlist)
    } catch (error) {
      setSuccess(false)
    }
  }
  getWatchlist()
}, [user])


const PF = import.meta.env.VITE_IMG_URL

const handleChange = async (e) => {
e.preventDefault()
update(userName, email, file, setSuccess, dispatch, setLoading, id)
 }

 const handleDelete = async () => {
    try {
       await axios.delete(import.meta.env.VITE_BASE_URL + `/user/${id}`,  {data: {userId: user._id }})
       dispatch(logout())
    } catch (error) {
        console.log(error)
    }
}



  return (
    <div className='settings'>
      <Nav />
      <div className="settingsInfo">
        <h1>
          Modify your profile
        </h1>
        <div className="userInfo">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : (user.profilePic ? PF + user.profilePic : 'https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg')} alt=''/>
            <input type='file' onChange={(e)=>setFile(e.target.files[0])} id='profilePic' style={{display:"none"}}/>
            <label htmlFor='profilePic'>
              <EditIcon className='editPic' />
            </label>
          </div>
          <form className="right" onSubmit={handleChange}>
            <input type='text'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='username' value={userName}   onChange={(e) =>setUserName(e.target.value)}/>
            <input type='password' placeholder="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
            <div className='profileBtns'>
              {!loading ? (
              <button type='submit'>Save Changes</button>)
            : (
              <button type='submit'>
                <CircularProgress style={{color: 'white'}} size={30}/>
              </button>
            )}
            {!loading ? (
              <button onClick={handleDelete}>Delete Account</button>)
            : (
              <button>
                <CircularProgress style={{color: 'white'}} size={30}/>
              </button>
            )}
          </div>
          </form>
        </div>
        <div className="feedback">
            {success && (
              <span style={{color: 'green', marginTop:'10px'}}>Account updated successfully.</span>
            )}
             {success === false && (
              <span style={{color: 'red', marginTop:'10px'}}>Something went wrong.</span>
            )}
                      
        </div>
      </div>

     <div className='settingsWatchlist'>
     <span>Your Watchlist</span>
        <div className="selection">
        {watchlist?.map((movie, index) => (
          <WatchListCard movie={movie} key={index} />
        ))}
        </div>
      </div> 
      <Footer />
    </div>
  )
}

export default Settings
