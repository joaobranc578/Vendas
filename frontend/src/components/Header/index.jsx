import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='header'>
            {/* Logo */}
            <div className='logo'>
                <Link to='/'>

                <span className='logo-1'>M</span>

                <span className='logo-2'>D</span>  

                <span className='logo-3'>X</span>                      
                </Link>
            </div>

            {/* Busca */}
            <div className='search-bar'>
                <input type='text' placeholder='Buscar "Apartamento"' />
                <div className='location'>
                    <button className='search-btn'>
                        <ion-icon name="search-outline"></ion-icon>
                    </button>
                </div>
            </div>

        </header>
    )
}