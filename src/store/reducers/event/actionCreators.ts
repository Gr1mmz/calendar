import {IUser} from '../../../models/IUser';
import {EventActionEnum, setEventsAction, setGuestsAction} from './types';
import {IEvent} from '../../../models/IEvent';
import {AppDispatch} from '../../index';
import UserService from '../../../api/UserService';

export const EventActionCreators = {
  setGuests: (payload: IUser[]): setGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
  setEvents: (payload: IEvent[]): setEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (e) {
      console.log(e);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem('events', JSON.stringify(json));
    } catch (e) {
      console.log(e);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(event => event.author === username || event.guest === username);
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.log(e);
    }
  }
}