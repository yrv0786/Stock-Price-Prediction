import logo from './logo.png';
import { Link } from 'react-router-dom'
import './VerticalNav.css'

function VerticalNav({isVisible}){
    return(
        isVisible && <div className="VerticalNav">
        <div className="VerticalNav-container">
            <div>
                <ul className='VerticalNav-logo'>
                    <li><Link to=""><img src={logo} alt="logo"></img></Link></li>
                </ul>
                <ul className='VerticalNav-list'>
                    <li className='active'><Link to=""><i className="fa fa-home"></i></Link></li>
                    <li><Link to=""><i className="fa fa-folder"></i></Link></li>
                    <li><Link to=""><i className="fa fa-envelope"></i></Link></li>
                    <li><Link to=""><i className="fa fa-calendar"></i></Link></li>
                    <li><Link to=""><i className="fa fa-plane"></i></Link></li>
                    <li><Link to=""><i className="fa fa-cog"></i></Link></li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default VerticalNav