import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from './pages/landing/App';
import Room from './pages/room/Room';
import NotFound from './pages/404/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/room" element={<Room />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  // </React.StrictMode>
);
