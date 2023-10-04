import React, {useContext, useState} from 'react'
import './nav.scss'
import logo from '../../assets/newLogo.png'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { logout } from '../../Context/AuthContext/AuthActions';


const Nav = () => {
const {dispatch, user} = useContext(AuthContext)
const [isScrolled, setIsScrolled] = useState(false)
window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true)
    return () => window.scrollY = null
}

const PF = import.meta.env.VITE_IMG_URL


const handleLogout = () => {
    dispatch(logout())
}
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
            <div className="left">
                <Link to='/' className='link'>
                    <img src={logo} alt='' className='logo'/>
                </Link>
                <Link to='/' className='link'>
                    <span>Home</span>
                </Link >
                <Link to='/movies' className='link'>
                    <span>Movies</span>
                </Link>
                <Link to='/series' className='link'>
                    <span>Series</span>
                </Link>
                <Link className='link' to='/search'>
                    <span>Search</span>
                </Link>

            </div>
            {user ? ( 
            <div className="right">
                <span>KID</span>
                <NotificationsIcon className='icon'/>
                <img src={user.profilePic ? PF + user.profilePic : 'https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg'} alt='' className='userImg'/>
                <div className="profile">
                    <ArrowDropDown className='icon'/>
                    <div className="options">
                        <div className="option">
                        <SettingsIcon />
                        <Link className='link' to={`/settings/${user._id}`}>
                            <span>Settings</span>
                        </Link>
                        </div>
                            <div className="option">
                            <LogoutIcon />
                            <span onClick={handleLogout}>Logout</span>
                            </div>
                    </div>
                </div>
            </div>
            ) : (
                <div className="right">
                    <Link to={'/login'} className='link'>
                        <span className='loginBtn'>Login</span>
                    </Link>
                </div>
            )}
        </div>
    </div>
  )
}

export default Nav