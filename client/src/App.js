import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Layout/Home';
import Signin from './components/Layout/Signin';
import Signup from './components/Layout/Signup';
import Profile from './components/Layout/Profile';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/profile' element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;
