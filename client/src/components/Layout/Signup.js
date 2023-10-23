import React from 'react'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <div className='logincard'>
        <div className="card auth-card input-field">
            <h2 className='brand-logo'>Instagram</h2>
            <input type="text" placeholder='name' />
            <input type="text" placeholder='email' />
            <input type="password" placeholder='password'/>
            <button className='btn waves-effect deep-orange lighten-1 waves-light'>Signup</button>
            <h6>
            Already have an Account? <Link to="/singin">Sign in</Link>
            </h6>
        </div>
    </div>
  )
}

export default Signup