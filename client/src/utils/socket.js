import { io } from 'socket.io-client';
require('dotenv');

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : 'http://localhost:9000';
const URL = 'https://c66a29e1-46be-430c-8eb3-a9b6e34c62cb-00-3tnlqub3r4tq9.picard.replit.dev/';

export const socket = io(URL, { autoConnect: false });