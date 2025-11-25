import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 👇 CAMBIO: Apuntamos a la carpeta styles
import './styles/index.css' 

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)