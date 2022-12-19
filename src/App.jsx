import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
import Header from './components/main/Header/Header';
import Invited from './pages/Invited/Invited';
import Welcome from './pages/Welcome/Welcome';
import Home from './pages/Home/Home';
import Kanban from './pages/Kanban/Kanban';
import PublicKanbans from './pages/PublicKanbans/PublicKanbans';

import AuthService from './services/AuthService';

const App = () => {
    const navigate = useNavigate()

    const [isAuth, setAuth] = useState(AuthService.authData() != null)

    const handleLogout = () => {
        AuthService.logout()
        setAuth(false)
        navigate("/", { replace: true })
    }
    
    const handleLogin = () => {
        setAuth(true)
        navigate("/home/", { replace: true })
    }

    useEffect(() => {
        if (isAuth) {
            handleLogin()
        } else {
            navigate("/", { replace: true })
        }
    }, [])
    

    return (
        <div className="App">
            <Header isAuth={isAuth} logout={handleLogout} />
            
            <Routes>
                <Route exact path="/" element={ <Welcome login={() => handleLogin()} /> } />
                <Route exact path="/kanbans" element= { <PublicKanbans /> } />
                <Route exact path="/home" element={ <Home /> } />
                <Route exact path="/home/kanban/:kid" element={ <Kanban /> } />
                <Route exact path="/invited" element={ <Invited /> } />
                <Route exact path="/invited/kanban/:kid" element={ <Kanban /> } />
            </Routes>

            <footer>
                <div>
                    <h1>Kanban</h1>
                </div>
                <div>
                    © 2023 IslamMkr Tous droits réservés.
                </div>
            </footer>
        </div>
    );
}

export default App;
