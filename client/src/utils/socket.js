import { io } from 'socket.io-client';
require('dotenv');

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENVIRONMENT === 'production' ? process.env.SERVER_URL : 'http://localhost:9000';
const URL = 'https://i-socket-server.jontronwonton.repl.co/';
// const URL = 'http://localhost:9000';

export const socket = io(URL, { autoConnect: false });