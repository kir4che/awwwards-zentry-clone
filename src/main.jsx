import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

import './global.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
)
