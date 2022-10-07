import axios from 'axios';

export const api = axios.create({
    baseURL: "https://crud-next-eight.vercel.app/api"
})