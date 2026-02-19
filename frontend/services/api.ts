import axios from "axios";

const API = "http://localhost:3000";

export const getHome = () => axios.get(`${API}/pages/home`);
export const getServices = () => axios.get(`${API}/services`);
export const sendContact = (data: any) => axios.post(`${API}/contact`, data);
