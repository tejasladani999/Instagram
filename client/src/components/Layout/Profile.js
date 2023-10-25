import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const [mypics,setMypics] = useState([ ])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
            setMypics(result.mypost)
        })
    },[])

  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{ display:'flex', justifyContent:'space-around',margin:"18px 0px",borderBottom: "1px solid grey"}}> 
            <div>
                <img src="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" alt="profilepic" style={{width:"160px",height:"160px",borderRadius:"80px"}} />
            </div>
            <div>
                <h4>{state?state.name:"loading"}</h4>
                <div style={{display: "flex",justifyContent:"space-between",width: '108%'}}>
                    <h6>40 Posts</h6>
                    <h6>40 followers</h6>
                    <h6>40 following</h6>
                </div>
            </div>
        </div>
        <div className="userpost">
            {
                mypics.map((item)=>{
                    return(
                        <img key={item.id} className='item' src={item.image} alt="item.title" />
                    )
            }
            )}

        </div>
    </div>
  )
}

export default Profile