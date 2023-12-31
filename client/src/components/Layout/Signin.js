import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'

const Signin = () => {
  const {state,dispatch} = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const PostData = ()=>{
    fetch("/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
        if(data.error){
            M.toast({html: data.error,classes:"red darken-3"})
        }
        else{
          localStorage.setItem('jwt',data.token)
          localStorage.setItem('user',JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
            M.toast({html:"signin successfully...", classes:"green lighten-1"})
            navigate('/');
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
            <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='btn waves-effect deep-orange lighten-1 waves-light' onClick={()=> PostData()}>Login</button>
            <h6>
              Don't have an Account? <Link to="/signup">signup</Link>
            </h6>
        </div>
    </div>
  )
}

export default Signin