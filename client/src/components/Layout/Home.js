import React from 'react'

const Home = () => {
  return (
    <div className='home'>
        <div className="card home-card">
            <h5>Tejas Ladani</h5>
            <div className="card-image">
                <img src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHdhbGxwYXBlciUyMGJpa2V8ZW58MHwwfDB8fHww" alt="" />
            </div>
            <div className="card-content">
            <i className="material-icons" style={{color:'red'}}>favorite</i>
                <h6>title</h6>
                <p>this is amazing Bike</p>
                <input type="text" placeholder='add a comment'/>
            </div>
        </div>
    </div>
  )
}

export default Home