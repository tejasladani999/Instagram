import React,{useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import M from 'materialize-css'

function CreatePost() {
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
      if(url){
        fetch("/createpost",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
          },
          body:JSON.stringify({
            title,
            body,
            pic:url
          })
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"red darken-3"})
            }
            else{
                M.toast({html:"post uploaded successfully...", classes:"green lighten-1"})
                navigate('/');
            }
        })
        .catch(err =>{
            console.log(err)
        })
      }
    },[url])

    const postDetails = () =>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','instagram')
        data.append('cloud_name','dmlt6r8vp')
        fetch('https://api.cloudinary.com/v1_1/dmlt6r8vp/image/upload',{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data =>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
  return (
    <div className='card input-feild' style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
        <input type="text" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
        <input type="text" placeholder='body' value={body} onChange={(e)=>setBody(e.target.value)}/>
        <div className="file-field input-field">
        <div className="btn deep-orange lighten-1">
            <span>Upload Image</span>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
        </div>
        </div>
        <button className='btn waves-effect deep-orange lighten-1 waves-light' onClick={() => postDetails()}>Upload Post</button>
    </div>
  )
}

export default CreatePost
