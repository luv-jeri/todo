import React, { useState, useEffect, memo } from 'react';
import s from './Form.module.css';

function Form({ title, fields, onSubmit, submitText }) {
  const [data, setData] = useState(() => {
    const data_ = {};
    fields.forEach((field) => {
      data_[field.name] = '';
    });
    return data_;
  });

  const onSubmit_ = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  useEffect(() => {
    const data_ = {};
    fields.forEach((field) => {
      data_[field.name] = '';
    });
    setData(data_);
  }, [fields]);

  return (
    <div className={s.container}>
      <h5>{title || 'Form'}</h5>
      <form className={s.form}>
        {fields.map((field) => {
          return (
            <div className={s.input} key={field.id}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                {...field}
                value={data[field.name]}
                onChange={(e) => {
                  setData({ ...data, [field.name]: e.target.value });
                }}
              />
            </div>
          );
        })}
        <button type='submit' onClick={onSubmit_}>
          {submitText || 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default memo(Form);
