import toast, { ToastOptions } from "react-hot-toast";

export const notify = (message: string, options: ToastOptions) => toast(message, options);