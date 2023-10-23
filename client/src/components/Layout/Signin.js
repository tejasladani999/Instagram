import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  return (
    <div className='logincard'>
        <div className="card auth-card input-field">
            <h2 className='brand-logo'>Instagram</h2>
            <input type="text" placeholder='email' />
            <input type="password" placeholder='password'/>
            <button className='btn waves-effect deep-orange lighten-1 waves-light'>Login</button>
            <h6>
              Don't have an Account? <Link to="/singup">sign up</Link>
            </h6>
        </div>
    </div>
  )
}

export default Signin