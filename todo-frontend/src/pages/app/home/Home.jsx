import React, { useRef } from 'react';
import s from './Home.module.css';
import NavComponent from '../../../components/nav/Nav.component';
import withProtected from './../../../hoc/Protected';
import FloatingComponent from '../../../components/floating/Floating.component';
import { useModal } from '../../../wrappers/modal/Modal.wrapper';
import useFetch from '../../../hooks/useFetch';
// import PlusIcon from '../../../assets/plus-icon.svg';
import List from '../../../components/list/List.component';
import TodoCard from '../../../components/todo_card/TodoCard.component';
import LoadingComponent from '../../../components/loading/Loading.component';
import AddTodo from '../../../modals/AddTodo/AddTodo.modal';

function Home() {
  const { openModal } = useModal();
  const page = useRef(1);
  const { data, repeat, loading, setData } = useFetch('/todo', {
    params: {
      page: page.current,
    },
  });

  const onEnd = async () => {
    page.current = page.current + 1;
    repeat({
      params: {
        page: page.current,
      },
    });
  };

  const onAdd = (data) => {
    setData((prev) => {
      return [data, ...prev];
    });
  };

  return (
    <header className={s.container}>
      <NavComponent />
      <FloatingComponent
        onClick={() => {
          openModal(<AddTodo onAdd={onAdd} />);
        }}
      />
      <section className={s.content}>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '85vh',
            }}
          >
            <LoadingComponent />
          </div>
        ) : (
          <List
            style={{
              height: '85vh',
            }}
            onEnd={onEnd}
          >
            {data.map((todo) => (
              <TodoCard key={todo._id} {...todo} />
            ))}
          </List>
        )}
      </section>
    </header>
  );
}

export default withProtected(Home);
