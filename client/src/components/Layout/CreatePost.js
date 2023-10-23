import React from 'react'

const createPost = () => {
  return (
    <div className='card input-feild' style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
        <input type="text" placeholder='title' />
        <input type="text" placeholder='body' />
        <div className="file-field input-field">
        <div className="btn deep-orange lighten-1">
            <span>Upload Image</span>
            <input type="file" />
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
        </div>
        </div>
        <button className='btn waves-effect deep-orange lighten-1 waves-light'>Send Post</button>
    </div>
  )
}

export default createPost