import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from '../../App'

const Home = () => {
  const [data,setData] = useState([])
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    fetch('/allpost',{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      setData(result.posts)
    })
  },[])

  const likesPost = (id)=>{
    fetch('/like',{
      method:'PUT',
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const unlikesPost = (id)=>{
    fetch('/unlike',{
      method:'PUT',
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  return (
    <div className='home'>
      {data.map(item=>{
        return(
          <div className="card home-card">
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
                <img src={item.image} alt="" />
            </div>
            <div className="card-content">
            {item.likes.includes(state._id)
            ? <i className="material-icons" style={{color:'red'}} onClick={()=>{unlikesPost(item._id)}}>favorite</i>
            : <i className="material-icons" onClick={()=>{likesPost(item._id)}}>favorite_border</i>
            }
                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                <input type="text" placeholder='add a comment'/>
            </div>
          </div>
        )
      }
      )}
    </div>
  )
}

export default Home