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
import axios from 'axios';
import catcher from '../../../utils/catcher';
const Loader = () => {
  return (
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
  );
};

function Home() {
  const { openModal } = useModal();

  const pagePending = useRef(1);
  const pageCompleted = useRef(1);

  const {
    data: pendingData,
    repeat: repeatPending,
    loading: pendingLoading,
    setData: setPendingData,
  } = useFetch('/todo', {
    params: {
      page: pagePending.current,
      completed: false,
    },
  });
  const {
    data: completedData,
    repeat: repeatCompleted,
    loading: completedLoading,
    setData: setCompletedData,
  } = useFetch('/todo', {
    params: {
      page: pageCompleted.current,
      completed: true,
    },
  });

  const onEndPending = async () => {
    pagePending.current = pagePending.current + 1;
    repeatPending({
      params: {
        page: pagePending.current,
      },
    });
  };

  const onEndCompleted = async () => {
    pageCompleted.current = pageCompleted.current + 1;
    repeatCompleted({
      params: {
        page: pageCompleted.current,
      },
    });
  };

  const onAdd = (data) => {
    setPendingData((prev) => {
      return [data, ...prev];
    });
  };

  const hanldeDropCompleted = catcher(
    async (value) => {
      if (value.completed) return;

      const { data } = await axios.patch(`/todo/${value._id}`, {
        completed: true,
      });

      setCompletedData((prev) => {
        return [...prev, data.data];
      });

      setPendingData((prev) => {
        return prev.filter((todo) => todo._id !== value._id);
      });
    },
    (error) => console.log(error)
  );

  const hanldeDropPending = catcher(
    async (value) => {
      if (!value.completed) return;

      const { data } = await axios.patch(`/todo/${value._id}`, {
        completed: false,
      });

      console.log('data', data);

      setPendingData((prev) => {
        return [...prev, data.data];
      });

      setCompletedData((prev) => {
        return prev.filter((todo) => todo._id !== value._id);
      });
    },
    (error) => {
      console.log(error);
    }
  );

  return (
    <header className={s.container}>
      <NavComponent />
      <FloatingComponent
        onClick={() => {
          openModal(<AddTodo onAdd={onAdd} />);
        }}
      />
      <section className={s.content}>
        {pendingLoading ? (
          <Loader />
        ) : (
          <List
            style={{
              height: '85vh',
              flex: 1,
            }}
            title='Pending'
            onEnd={onEndPending}
            onDrop={hanldeDropPending}
          >
            {pendingData.map((todo) => (
              <TodoCard key={todo._id} {...todo} />
            ))}
          </List>
        )}
        {completedLoading ? (
          <Loader />
        ) : (
          <List
            style={{
              height: '85vh',
              flex: 1,
            }}
            title='Completed'
            onEnd={onEndCompleted}
            onDrop={hanldeDropCompleted}
          >
            {completedData.map((todo) => (
              <TodoCard key={todo._id} {...todo} />
            ))}
          </List>
        )}
      </section>
    </header>
  );
}

export default withProtected(Home);
