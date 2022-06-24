import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from './types';
import {IUser} from '../../../models/IUser';
import {AppDispatch} from '../../index';
import axios from 'axios';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
  setAuth: (auth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: auth}),
  setError: (error: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload: error}),
  setLoading: (loading: boolean): SetLoadingAction => ({type: AuthActionsEnum.SET_LOADING, payload: loading}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setLoading(true));
      setTimeout(async () => {
        const response = await axios.get<IUser[]>('./users.json');
        const user = response.data.find(user => user.username === username && user.password === password);
        if (user) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', user.username);
          dispatch(AuthActionCreators.setAuth(true));
          dispatch(AuthActionCreators.setUser(user));
        }
        dispatch(AuthActionCreators.setError('Неверный логин/пароль'));
        dispatch(AuthActionCreators.setLoading(false));
      }, 1000);
    } catch (e) {
      dispatch(AuthActionCreators.setError('Ошибка при входе'));
    }
  },
  logout: () => (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setAuth(false));
    dispatch(AuthActionCreators.setError(''));
  },
}