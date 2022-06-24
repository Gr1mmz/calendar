import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import {rules} from '../utils/rules';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';

const LoginForm: React.FC = () => {
  const {login} = useActions();
  const {error, isLoading} = useTypedSelector(state => state.authReducer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = () => {
    login(username, password);
  }
  return (
    <Form layout='vertical' className='login-form' onFinish={onSubmit}>
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required('Введите имя пользователя')]}
      >
        <Input value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required('Введите пароль')]}
      >
        <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Item>
      {error && <div style={{color: 'red', display: 'flex', justifyContent: 'center'}}>{error}</div>}
      <Form.Item style={{display: 'flex', alignItems: 'center', marginBottom: '0'}} wrapperCol={{span: 7}}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;