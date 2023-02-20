import React, { useEffect, useState, useContext, useCallback, memo, useRef } from 'react';
import s from './Notification.module.css';
const NotificationContext = React.createContext();

const NotificatoinCard = memo(({ notification }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${s.flyer} ${!show ? s['slide-out'] : s['slide-in']}`}
      style={{
        backgroundColor: notification?.type === 'error' ? '#EB455F' : '#7DB9B6',
      }}
    >
      <h6 className={s.notification__title}>{notification?.title}</h6>
      <p className={s.notification__message}>{notification?.message}</p>
    </div>
  );
});

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((notification) => {
    const id = Math.floor(Math.random() * 100000);
    setNotifications((prev) => [
      ...prev,
      {
        ...notification,
        id,
      },
    ]);
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const value = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      <div className={s.notification__panel}>
        {notifications.map((notification) => (
          <NotificatoinCard key={notification.id} notification={notification} />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
}
