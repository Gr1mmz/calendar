import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes, RoutesNames} from '../routes';
import {useTypedSelector} from '../hooks/useTypedSelector';

const AppRouter: React.FC = () => {
  const {isAuth} = useTypedSelector(state => state.authReducer)
  return (
    isAuth
      ?
      <Routes>
        {privateRoutes.map(route => <Route key={route.path} path={route.path} element={<route.component/>}/>)}
        <Route path={RoutesNames.NAVIGATE} element={<Navigate replace to={RoutesNames.EVENTS}/>}/>
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.component/>}/>)}
        <Route path={RoutesNames.NAVIGATE}  element={<Navigate replace to={RoutesNames.LOGIN}/>}/>
      </Routes>
  );
};

export default AppRouter;