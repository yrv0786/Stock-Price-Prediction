import './HorizontalNav.css'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HorizontalNav() {
    return (
        <div className="HorizontalNav">
            <div className="HorizontalNav-container">
                <div className='HorizontalNav-logo'>
                    <i className="fa fa-bars"></i><p>Welcome to Psych!</p>
                </div>
                <div className='HorizontalNav-user-details'>
                    {/* <i className="fa fa-bell"></i> */}
                    <AccountCircleIcon />
                </div>
        </div>
        </div >
    )
}

export default HorizontalNav