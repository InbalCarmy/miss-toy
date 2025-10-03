import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '../store/user/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { LoginSignup } from './LoginSignup.jsx'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    function onLogout() {
        logout()
            .then(() => showSuccessMsg('Bye Bye'))
            .catch(() => showErrorMsg('Cannot logout'))
    }


    return (

        <header className="app-header">
            <section className="header-container">
                <h2>Toys</h2>
                <nav className='app-nav'>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='About'>About</NavLink>
                    <NavLink to='/toy'>Toys</NavLink>
                </nav>
            </section>
            {user ? (
                <section className='hello-user'>
                    <span>Hello {user.fullname}!</span>
                    <button onClick={onLogout}>Logout</button>

                </section>
            ) : (
                <section>
                    <LoginSignup/>
                </section>
            )}
        </header>



    )
}