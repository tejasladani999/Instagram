import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Layout/Home';
import Signin from './components/Layout/Signin';
import Signup from './components/Layout/Signup';
import Profile from './components/Layout/Profile';
import CreatePost from './components/Layout/CreatePost';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/create' element={<CreatePost/>} />
      </Routes>
    </Router>
  );
}

export default App;
