export default function catcher(fun, onError, onSuccess) {
  const to_return = async (...args) => {
    try {
      const data = await fun(...args);
      onSuccess && onSuccess(data);
      return true;
    } catch (error) {
      console.log(error);
      onError && onError(error);
      return false;
    }
  };
  return to_return;
}
