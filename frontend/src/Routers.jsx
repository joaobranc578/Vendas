import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import SingUp from './pages/SingUp'

export default () => {
    return (
        <Routes>
        <Route path='/' element={<Home />}/>    
        <Route path='/about' element={<About />}/>
        <Route path='*' element={<div>Página não encontrada</div>}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/singUp' element={<SingUp />}/>
        </Routes>

    )
}