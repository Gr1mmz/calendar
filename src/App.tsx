import React, {useEffect} from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import Layout, {Content} from 'antd/es/layout/layout';
import './App.css';
import {useActions} from './hooks/useActions';
import {IUser} from './models/IUser';

const App: React.FC = () => {
  const {setUser, setAuth} = useActions();
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('username' || '')} as IUser);
      setAuth(true);
    }
  }, [])

  return (
    <Layout>
      <Navbar/>
      <Content>
        <AppRouter/>
      </Content>
    </Layout>
  );
}

export default App;
