import React from 'react';
import s from './Floating.module.css';

function FloatingComponent({ onClick, element }) {
  return (
    <div onClick={onClick} className={s.floating__button}>
      {element ? element : '👀'}
    </div>
  );
}

export default FloatingComponent;
