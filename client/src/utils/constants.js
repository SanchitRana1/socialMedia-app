const BASE_URL= import.meta.env.VITE_NODE_ENV ==="production" ? "https://socialmedia-app-fszt.onrender.com":"http://localhost:5000"
export const USERS_API = `${BASE_URL}/users`
export const POSTS_API = `${BASE_URL}/posts`
export const AUTH_API = `${BASE_URL}/auth`
export const ASSETS_API = `${BASE_URL}/assets`
