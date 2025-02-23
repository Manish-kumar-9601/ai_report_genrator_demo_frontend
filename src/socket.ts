import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = import.meta.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
console.log(import.meta.env?.VITE_WS_URL);
// export const socket = io(`${import.meta.env.VITE_WS_URL}`);
export const socket = io(`ws://localhost:3000`);