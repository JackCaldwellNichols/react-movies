import React from 'react'
import logo from '../../assets/newLogo.png'
import './footer.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Footer = () => {
  return (
    <div className='footer'>
        <img src={logo} alt='logo' />
        <div className="iconCont">
            <FacebookIcon />
            <TwitterIcon />
            <YouTubeIcon />
        </div>
    </div>
  )
}

export default Footer