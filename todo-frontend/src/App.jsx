import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/app/home/Home';
import Profile from './pages/app/profile/Profile';
import SignIn from './pages/auth/sign_in/SignIn';
import SignUp from './pages/auth/sign_up/SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/sign_up' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
