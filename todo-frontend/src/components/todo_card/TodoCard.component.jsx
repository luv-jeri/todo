import React from 'react';
import s from './TodoCard.module.css';
import formatDate from '../../utils/formateDate';

function TodoCard({ title, description, completed, createdAt }) {
  return (
    <div
      className={s.card}
      style={{
        borderBottom: completed
          ? 'var(--xs) solid var(--clr-success)'
          : 'var(--xs) solid var(--clr-error)',
      }}
    >
      <div className={s.card__header}>
        <h3 className={s.card__title}>{title}</h3>
        <p className={s.card__date}>{formatDate(createdAt)}</p>
      </div>
      <p className={s.card__description}>{description}</p>
      <div className={s.card__footer}>
        <p className={s.card__completed}>{completed ? 'Completed' : 'Pending'}</p>
      </div>
    </div>
  );
}

export default TodoCard;
