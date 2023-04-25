import { Link } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'

function Header({ title }) {
    const [stockCompany, setStockCompany] = useState('apple');
    const handleChange = (e) => {
        setStockCompany(e.target.value);
    };
    return (
        <div className='Header'>
            <div className='Header-container'>
                <div>
                    <p>{title} <span>AAPL</span></p><i className="fa fa-sort"></i>
                </div>
                <div className='Header-dashboard-features'>
                    <select value={stockCompany} onChange={handleChange}>
                        <option value="apple">Apple</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Netflix">Netflix</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Header