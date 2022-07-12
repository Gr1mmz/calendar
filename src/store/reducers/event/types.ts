import {IUser} from '../../../models/IUser';
import {IEvent} from '../../../models/IEvent';

export interface EventState {
  guests: IUser[];
  events: IEvent[];
}

export enum EventActionEnum {
  SET_GUESTS = 'SET_GUESTS',
  SET_EVENTS = 'SET_EVENTS'
}

export interface setGuestsAction {
  type: EventActionEnum.SET_GUESTS;
  payload: IUser[];
}

export interface setEventsAction {
  type: EventActionEnum.SET_EVENTS;
  payload: IEvent[];
}

export type EventAction = setGuestsAction | setEventsAction;