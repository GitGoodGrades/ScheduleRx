import React from 'react';
import List from 'material-ui/List';
import { ListItems} from '../../components/tileData';
import Calendar from '../../components/Calendar';

const eventList = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2018, 2, 10),
      end: new Date(2018, 2, 11),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2018, 2, 12),
      end: new Date(2015, 2, 13),
    },
]  

const Home = () => <div height="100%"><Calendar events={eventList}/></div>;

export default Home;