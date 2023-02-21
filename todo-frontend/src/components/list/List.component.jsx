import React, { useRef, useEffect, useCallback } from 'react';
import s from './List.module.css';

function List({ children, style = {}, onEnd }) {
  const listRef = useRef(null);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    // check if the scroll has reached the bottom
    const isAtEnd = scrollTop + clientHeight === scrollHeight;
    if (isAtEnd) {
      onEnd && onEnd();
      console.log('reached bottom');
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
  return (
    <div ref={listRef} className={s.list} style={style}>
      {children}
    </div>
  );
}

export default List;
