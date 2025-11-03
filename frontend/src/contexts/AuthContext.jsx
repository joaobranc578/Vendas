import { createContext, useContext, useState, useEffect } from 'react';
import { isLogged, getUser } from '../lib/AuthHandler';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialLoggedState = isLogged();
    const initialUserState = initialLoggedState ? getUser() : null;

    const [logged, setLogged] = useState(initialLoggedState);
    const [user, setUser] = useState(initialUserState);

    return (
        <AuthContext.Provider value={{ logged, setLogged, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);