import React from 'react';
import {Header} from 'antd/es/layout/layout';
import {Menu, Row} from 'antd';
import {useNavigate} from 'react-router-dom';
import {RoutesNames} from '../routes';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';

const Navbar: React.FC = () => {
  const router = useNavigate();
  const {logout} = useActions();
  const {isAuth, user} = useTypedSelector(state => state.authReducer);
  const items = [
    {
      label: isAuth ? 'Выйти' : 'Логин',
      key: 'login'
    },
  ];

  const handleClick = () => {
    if (isAuth) {
      logout();
      router(RoutesNames.LOGIN);
    }
  };

  return (
    <Header>
      <Row justify='end'>
        {isAuth && (<div style={{color: '#fff', padding: '0 20px'}}>{user.username}</div>)}
        <Menu theme='dark' mode='horizontal' selectable={false} onClick={() => handleClick()}
              items={items} disabledOverflow={true}>
        </Menu>
      </Row>
    </Header>
  );
};

export default Navbar;