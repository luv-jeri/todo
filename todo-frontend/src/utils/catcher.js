import { useNotification } from '../wrappers/notification/Notification.wrapper';

export default function catcher(fun) {
  const { showNotification } = useNotification();
  const to_return = async (...args) => {
    try {
      return await fun(...args);
    } catch (error) {
      console.log(error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || error.message,
      });
    }
  };
  return to_return;
}
