import axios from "axios"

export const BACKEND_URI = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000'

const axiosInstance = axios.create({
  validateStatus: () => true
});

export {
  axiosInstance
}