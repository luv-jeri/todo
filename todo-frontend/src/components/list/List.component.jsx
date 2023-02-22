import React, { useRef, useEffect, useCallback } from 'react';
import s from './List.module.css';

function List({ children, style = {}, onEnd, onDrop, title }) {
  const listRef = useRef(null);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    // check if the scroll has reached the bottom
    const isAtEnd = scrollTop + clientHeight === scrollHeight;
    if (isAtEnd) {
      onEnd && onEnd();
    }
  }, []);

  useEffect(() => {
    if (listRef.current) {
      // set up the scroll event listener
      listRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listRef.current) {
        // remove the scroll event listener
        listRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const cardData = JSON.parse(e.dataTransfer.getData('data'));
    e.dataTransfer.clearData();
    onDrop && onDrop(cardData);
  };

  return (
    <div
      ref={listRef}
      className={s.list}
      style={style}
      onDragOver={onDragOver}
      onDrop={handleOnDrop}
    >
      <h3 className={s.list__title}>{title}</h3>
      {children.length > 0 ? (
        children
      ) : (
        <p className={s.list__empty}>
          No {title.toLowerCase()} todo found. Add a new one.
        </p>
      )}
    </div>
  );
}

export default List;
