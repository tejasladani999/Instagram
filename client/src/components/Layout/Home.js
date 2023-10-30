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

  const makecomment = (text,postId)=>{
    fetch('/comment',{
      method:'PUT',
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId,
        text
      })
    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
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

  const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData =data.filter(item=>{
        return item._id !== result._id;
      })
      setData(newData)
    })
  }
  return (
    <div className='home'>
      {data.map(item=>{
        return(
          <div className="card home-card">
            <h5>{item.postedBy.name} 
            {item.postedBy._id === state._id &&
            <i className="material-icons" style={{color:'red',float:'right'}} onClick={()=>deletePost(item._id)}>delete</i> }
            </h5>

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
              {item.comments.map(record=>{
                return(
                  <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                )
              })}
                <p>{item.body}</p>
                <form onSubmit={(e)=>{e.preventDefault()
                  makecomment(e.target[0].value,item._id)}}>
                <input type="text" placeholder='add a comment'/>
                </form>
            </div>
          </div>
        )
      }
      )}
    </div>
  )
}

export default Home