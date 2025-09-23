// src/hooks/useToast.js
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastEmitter = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

const useToast = () => {
  const success = (message) => toast.success(message, toastEmitter);
  const error = (message) => toast.error(message, toastEmitter);
  const info = (message) => toast.info(message, toastEmitter);
  const warning = (message) => toast.warning(message, toastEmitter);

  return { success, error, info, warning };
};

export default useToast;
