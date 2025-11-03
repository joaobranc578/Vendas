import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa"; 
import { isLogged, doLogout, getUser } from "../../lib/AuthHandler";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Header() {
    const { logged, setLogged, user, setUser } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const checkLogin = () => {
            const loggedIn = isLogged();
            setLogged(loggedIn);
            if (loggedIn) {
               const userData = getUser();
                setUser(userData);
            } else {
                setUser(null);
            }
        }
        
        checkLogin();

            const handleStorageChange = (e) => {
                if (e.key === 'token' || e.key === 'user') {
                    checkLogin();
                }
            }
            window.addEventListener('storage', handleStorageChange);

            return () => {
                window.removeEventListener('storage', handleStorageChange);
            }
    }, [setLogged, setUser]);

    const handleLogout = () => {
        doLogout();
        setLogged(false);
        setUser(null);
        navigate('/signin');
    }


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
                    <input type="text" placeholder='Buscar "Apartamento"' />
                    <div className='location'>
                        <button className='search-btn'>
                            <ion-icon name="search-outline"></ion-icon>
                        </button>
                    </div>
                </div>


                {/* Botões */}
                <nav className='navbar'>
                    <ul>
                       { logged ? (
                        <>
                        <li>
                          <Link to='/' className='meus-anuncios'>
                          Meus Anúncios
                          </Link>  
                        </li>    
                        <li>
                            <Link to='/post-an-ad' className='anunciarBtn'>
                            Postar um Anúncio
                            </Link>
                        </li>
                        <li className='profileContainer'>
                            <button className='profileBtn' onClick={() => setMenuOpen(!menuOpen)}>

                            <img src={user.photoURL}
                             alt={user.name} 
                             className='profileImg' 
                             />
                              <span>{user.name?.split(' ')[0]}</span>
                              <FaAngleDown size={16}
                              className='arrow' />
                            </button>
                            {menuOpen && (
                                <div className='dropdown'>
                                    <button>Minha Conta</button>
                                    <button>Favoritos</button>
                                    <button onClick={handleLogout}>
                                        Sair
                                    </button>
                                    </div>
                            )}
                        </li>
                        </>
                       ) : (
                        <>

                         <li>
                            <Link to='/Signin' className='entrarBtn'>Entrar</Link>
                        </li>
                        <li>
                            <Link to='/' className='anunciarBtn'>Anunciar Grátis</Link>
                        </li>

                        </>
                       )}
                    </ul>
                </nav>
        </header>
    )
}