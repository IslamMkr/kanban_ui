import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Auth from './pages/Auth/Auth';
import Container from './pages/Container/Container';

import AuthService from './services/AuthService';

const App = () => {
    const [isAuth, setAuth] = useState(false)

    const handleLogout = () => {
        console.log("App\t: handling logout")
        AuthService.logout()

        setAuth(AuthService.authData() != null)
    }

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={ <Auth /> } />
                    <Route exact path="/home" element={ <Container /> } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
