import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
  const [name,setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const PostData = ()=>{
    fetch("/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        password,
        email
      })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error,classes:"red darken-3"})
        }
        else{
            M.toast({html: data.message, classes:"green lighten-1"})
            navigate('/signin');
        }
    })
    .catch(err =>{
        console.log(err)
    })
}

  return (
    <div className='logincard'>
        <div className="card auth-card input-field">
            <h2 className='brand-logo'>Instagram</h2>
            <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='btn waves-effect deep-orange lighten-1 waves-light' onClick={()=>PostData()}>Signup</button>
            <h6>
            Already have an Account? <Link to="/singin">Sign in</Link>
            </h6>
        </div>
    </div>
  )
}

export default Signup