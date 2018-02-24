import React from 'react';
import Calendar from '../../components/Calendar';

const events = [
    {
      title: 'Event very long title',
      startDate: new Date(2018, 1, 10, 20, 0, 0, 0),
      endDate: new Date(2018, 1, 10, 21, 0, 0, 0),
    },
    {
      title: 'Long Event',
      startDate: new Date(2018, 1, 18, 20, 0, 0, 0),
      endDate: new Date(2018, 1, 19, 21, 0, 0, 0),
    },
]  

const Home = () => <div minHeight="700" className="rbc-calendar"><Calendar events={events}/></div>;

export default Home;