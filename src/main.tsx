import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'  // ← AGREGAR ESTA LÍNEA
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'aos/dist/aos.css'
import './styles/custom.css'
import './i18n/config'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
