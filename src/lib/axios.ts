import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
})
export const cloud = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/`,
})
