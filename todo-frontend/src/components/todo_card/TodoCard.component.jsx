import React, { useRef } from 'react';
import s from './TodoCard.module.css';
import formatDate from '../../utils/formateDate';

function TodoCard({ title, description, completed, createdAt, _id }) {
  const cardRef = useRef(null);
  const onDragStart = (e) => {
    e.target.style.opacity = 0.2;
    e.dataTransfer.setData(
      'data',
      JSON.stringify({
        _id: e.target.id,
        completed,
        description,
        title,
        createdAt,
      })
    );
  };
  const onDragEnd = (e) => {
    e.target.style.opacity = 1;
    e.dataTransfer.clearData();
  };

  return (
    <div
      ref={cardRef}
      className={s.card}
      id={_id}
      style={{
        borderBottom: completed
          ? 'var(--xs) solid var(--clr-success)'
          : 'var(--xs) solid var(--clr-error)',
      }}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
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
