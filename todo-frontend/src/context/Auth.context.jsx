import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoadingComponent from '../components/loading/Loading.component';
import { useNotification } from '../wrappers/notification/Notification.wrapper';
import catcher from '../utils/catcher';
import Error_ from '../utils/error_';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const { showNotification } = useNotification();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('outfit-token');
    if (token && token !== 'undefined') {
      axios.defaults.headers.common['Authorization'] = `${token}`;
      return token;
    }
    return null;
  });

  const who_am_i = catcher(
    async () => {
      const { data } = await axios.get('auth/who_am_i');
      return data;
    },
    (error) => {
      // ! Better way will to re try and check the type of error and then show the notification
      showNotification({
        title: error.title,
        message: error.message,
        type: 'error',
      });
      setLoading(false);
      setToken(null);
      localStorage.removeItem('outfit-token');
      setUser(null);
    },
    (_onSuccess) => {
      const { data } = _onSuccess;
      setUser(data);
      setLoading(false);
    }
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
      who_am_i();
    } else {
      setLoading(false);
    }
  }, [token]);

  const sign_in = async (email, password) => {
    const { data } = await axios.post('auth/sign_in', {
      email,
      password,
    });

    localStorage.setItem('outfit-token', data.token);
    setToken(data.token);

    return data;
  };

  const sign_up = async ({ photo, email, password, confirmPassword, name }) => {
    if (password !== confirmPassword) {
      throw new Error_('Password and confirm password must be same', 'Check Password');
    }

    if (!name || !email || !password || !confirmPassword) {
      throw new Error_('All fields are required', 'Check Fields');
    }

    console.log(photo);
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

    return data;
  };

  const sign_out = () => {
    console.log('sign out');
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

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingComponent />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
