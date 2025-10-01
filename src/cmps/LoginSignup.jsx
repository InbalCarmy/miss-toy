import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { signup, login } from '../store/user/user.actions.js'
import { LoginForm } from './LoginForm.jsx'


export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch(() => { showErrorMsg('Oops try again') })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch(() => { showErrorMsg('Oops try again') })
    }



    return(
        <div className='login-signup'>
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />

            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(isSignup => !isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>

        </div>
    )
}