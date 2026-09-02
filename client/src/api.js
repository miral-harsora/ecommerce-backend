import axios from "axios";

// A deployed ShopSphere uses the same Express origin. Set VITE_API_URL only
// when the frontend must call a separately hosted API.
const baseURL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL: baseURL.replace(/\/$/, ""),
  timeout: 15000,
});
