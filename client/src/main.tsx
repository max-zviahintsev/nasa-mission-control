import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './shared/index.css'
import App from './App.tsx'
import Launch from './pages/launch/Launch.tsx'
import Upcoming from './pages/upcoming/Upcoming.tsx'
import History from './pages/history/History.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Launch />} />
          <Route path="launch" element={<Launch />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
