import React from 'react';
import { TOKEN_POST, TOKEN_AUTH_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const userContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem('@Dogs:token', token);
      await getUser(token);
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  const userLogout = React.useCallback(
    function userLogout() {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('@Dogs:token');
      navigate('/login');
    },
    [navigate],
  );
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('@Dogs:token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_AUTH_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token Invalido!!');
          await getUser(token);
          navigate('/conta');
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout, navigate]);
  return (
    <userContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </userContext.Provider>
  );
};
