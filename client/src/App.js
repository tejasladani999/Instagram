import './App.css';
import React, { useEffect,createContext,useReducer,useContext } from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom'
import Home from './components/Layout/Home';
import Signin from './components/Layout/Signin';
import Signup from './components/Layout/Signup';
import Profile from './components/Layout/Profile';
import CreatePost from './components/Layout/CreatePost';
import {initialState, reducer} from './reducers/userReducer'

export const UserContext = createContext()

const Routing =()=>{
  const navigate = useNavigate()
  const {state,dispatch} =useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER",payload:user})
      navigate('/')
    }
    else{
      navigate('/signin')
    }
  },[])
  
  return(
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/create' element={<CreatePost/>} />
    </Routes>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <Router>
      <Navbar/>
        <Routing/>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
