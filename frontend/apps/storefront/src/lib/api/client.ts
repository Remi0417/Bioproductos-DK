import axios from "axios"

// Cliente para la API de Django (biobackend)
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})
