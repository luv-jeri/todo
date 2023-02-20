import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNotification } from '../wrappers/notification/Notification.wrapper';
import { useNavigate } from 'react-router-dom';
import catcher from '../utils/catcher';
const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('outfit-token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
    return token;
  });

  const who_am_i = async () => {
    try {
      const { data } = await axios.get('auth/who_am_i');
      console.log(data);
      setUser(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
      who_am_i();
    }
  }, [token]);

  const sign_in = async (email, password) => {
    console.log('sign_in');
    const { data } = await axios.post('auth/sign_in', {
      email,
      password,
    });

    console.log(data);

    localStorage.setItem('outfit-token', data.token);
    setToken(data.token);
  };

  const sign_up = catcher(async ({ photo, email, password, confirmPassword, name }) => {

    if (password !== confirmPassword) {
      return showNotification({
        type: 'error',
        title: 'Error',
        message: `Password and confirm password doesn't match`,
      });
    }

    if (!name || !email || !password || !confirmPassword) {
      return showNotification({
        type: 'error',
        title: 'Error',
        message: `Please fill all the fields`,
      });
    }

    const { data } = await axios.post('/auth/sign_up', {
      email,
      password,
      confirmPassword,
      name,
      role: 'user',
      photo,
    });

    localStorage.setItem('outfit-token', data.token);
    setToken(data.token);
  });

  const sign_out = () => {
    localStorage.removeItem('outfit-token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    sign_in,
    sign_out,
    sign_up,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
