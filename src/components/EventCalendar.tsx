import React from 'react';
import {Badge, BadgeProps, Calendar} from 'antd';
import {IEvent} from '../models/IEvent';
import {Moment} from 'moment';
import {formatDate} from '../utils/date';

interface IEventCalendarProps {
  events: IEvent[]
}

const EventCalendar: React.FC<IEventCalendarProps> = ({events}) => {
  const dateCellRender = (value: Moment) => {
    const formattedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter(event => event.date === formattedDate)
    return (
      <div>
        {currentDayEvents.map((event, index) => (
          <div key={index}>{event.description}</div>
        ))}
      </div>
    );
  };

  return (
    <Calendar dateCellRender={dateCellRender}/>
  );
};

export default EventCalendar;