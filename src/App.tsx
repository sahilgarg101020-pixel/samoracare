import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </BrowserRouter>
  );
}
