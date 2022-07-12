import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, Select} from 'antd';
import {rules} from '../utils/rules';
import {IUser} from '../models/IUser';
import {IEvent} from '../models/IEvent';
import {Moment} from 'moment';
import {formatDate} from '../utils/date';
import {useTypedSelector} from '../hooks/useTypedSelector';

interface IEventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: React.FC<IEventFormProps> = ({guests, submit}) => {
  const {user} = useTypedSelector(state => state.authReducer)
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: ''
  } as IEvent);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({...event, date: formatDate(date.toDate())})
    };
  };

  const handleSubmitForm = () => {
    submit({...event, author: user.username});
  };

  return (
    <Form layout='vertical' onFinish={handleSubmitForm}>
      <Form.Item
        label="Описание события"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={e => setEvent({...event, description: e.target.value})}
        />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[rules.required(), rules.isDateAfter('Выберите корректную дату')]}
      >
        <DatePicker onChange={(date) => selectDate(date)}/>
      </Form.Item>
      <Form.Item
        label="Выберите гостя"
        name="guest"
        rules={[rules.required()]}
      >
        <Select onChange={(guest: string) => setEvent({...event, guest})}>
          {guests.map(guest =>
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item style={{display: 'flex', alignItems: 'flex-end', marginBottom: '0'}} wrapperCol={{span: 7}}>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;