import React from 'react';
import s from './Home.module.css';
import NavComponent from '../../../components/nav/Nav.component';
const pendingTodos = [
  {
    id: 1,
    title: 'Learn React',
    description: 'Learn React from scratch',
    conpletedOn: null,
    createdAt: '2021-07-01T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'Learn React',
    description: 'Learn React from scratch',
    conpletedOn: null,
    createdAt: '2021-07-01T12:00:00.000Z',
  },
  {
    id: 1,
    title: 'Learn React',
    description: 'Learn React from scratch',
    conpletedOn: null,
    createdAt: '2021-07-01T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'Learn React',
    description: 'Learn React from scratch',
    conpletedOn: null,
    createdAt: '2021-07-01T12:00:00.000Z',
  },
  {
    id: 1,
    title: 'Learn React',
    description: 'Learn React from scratch',
    conpletedOn: null,
    createdAt: '2021-07-01T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'Learn React',
    description: 'Learn React from scratch',
    conpletedOn: null,
    createdAt: '2021-07-01T12:00:00.000Z',
  },
];

function Home() {
  return (
    <header className={s.container}>
      <NavComponent />
    </header>
  );
}

export default Home;
