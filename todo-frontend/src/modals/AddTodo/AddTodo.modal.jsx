import React, { useMemo } from 'react';
import s from './AddTodo.module.css';
import axios from 'axios';
import catcher from '../../utils/catcher';
import { useNotification } from '../../wrappers/notification/Notification.wrapper';
import Form from '../../components/Form/Form.component';

function AddTodo({ onAdd }) {
  const { showNotification } = useNotification();
  const fields = useMemo(
    () => [
      {
        id: `title-${Date.now()}`,
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter title',
      },
      {
        id: `description-${Date.now()}`,
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter description',
      },
    ],
    []
  );

  const handleSubmit = catcher(
    async (values) => {
      const { data } = await axios.post('todo', values);
      return data;
    },
    (error) => {
      console.log(error);
      showNotification({
        title: error.title || 'Add Todo Error',
        message: error.message,
        type: 'error',
      });
    },
    (onSuccess) => {
      const { data } = onSuccess;
      showNotification({
        title: 'Add Todo Success',
        message: `Todo ${data.title} added successfully`,
        type: 'success',
      });
      onAdd(data);
    }
  );
  return (
    <div>
      <Form title='Add Todo' fields={fields} onSubmit={handleSubmit} submitText='Add' />
    </div>
  );
}

export default AddTodo;
