import './Signin.css';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useState } from 'react';
import { signInWithGooglePopup } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../../lib/AuthHandler';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function Signin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setLogged, setUser } = useAuth();

    async function handleGoogleSignIn() {
        setLoading(true);
        setError(null);
    
        try {
          const result = await signInWithGooglePopup();

          if(!result) {
            throw new Error('Usuário não encontrado');
          }

          const userObj = result;
        const token = await userObj.getIdToken();

        const userData = {
            name: userObj.displayName,
            email: userObj.email,
            photoURL: userObj.photoURL,
            uid: userObj.uid,
        }

        doLogin(token, userData);

        setLogged(true);
        setUser(userData);
        console.log('Usuário logado', userData);

        navigate('/');
        }catch (err) {
            console.error ('Erro ao fazer login com Google:', err);
            setError(err.message || 'Erro no login');
        }finally {
            setLoading(false);
        }
    
    }



    return (
        <div className='container'>
            <div className='card'>
                <h2>Entre na sua conta e negocie com segurança!</h2>
                <p>Acesse e aproveite uma experiência segura dentro da MDX</p>

                <div className='socialLogin'>
                    <button
                     className='google'
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    aria-label='Entrar com Google'
                    >
                        <FcGoogle size={24}/>
                    </button>
                    <button className='facebook'>
                        <FaFacebookF size={24}/>
                    </button>
                </div>
                    
                    <div className='divider'>
                        <span>Ou conect com</span>
                    </div>

                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder='Digite seu e-mail' />

                    <button className='acessarBtn'>Acessar</button>

                    <p className='register'>
                        Não tem uma conta? <a href="/SingUp">Cadastre-se</a>
                    </p>

                    {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
                    
            </div>
                <p className='terms'>Ao continuar, você concorda com os <a href="#">Termos de Uso</a> e <a href="#">Política de privacidade</a> da MDX e seus parceiros, e em receber comunicações da MDX.</p>
        </div>
    )
}
