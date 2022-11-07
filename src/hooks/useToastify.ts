import { toast, useToastContainer, ToastOptions } from 'react-toastify';

const useToast = () => {
  const stack: any[] = [];
  const LIMIT = 1;

  const defaulOptions: ToastOptions = {
    onOpen(props) {
      stack.push(props);
    },
    onClose(props) {
      stack.shift();
    },
  };

  const ableToast = () => stack.length < LIMIT;

  const error = (error?: any, options?: ToastOptions) => {
    if (!ableToast()) return;
    toast.error(error, { ...defaulOptions, ...options });
  };

  const success = (success?: string, options?: ToastOptions) => {
    if (!ableToast()) return;
    toast.success(success, { ...defaulOptions, ...options });
  };

  const warning = (warning?: string, options?: ToastOptions) => {
    if (!ableToast()) return;
    toast.warning(warning, { ...defaulOptions, ...options });
  };

  return {
    error,
    success,
    warning,
  };
};

export default useToast;
