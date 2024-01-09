import { io } from 'socket.io-client';
require('dotenv');

const URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : 'http://localhost:9000';

export const socket = io(URL, { autoConnect: false });