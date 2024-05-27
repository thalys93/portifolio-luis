import React from 'react'
import ReactDOM from 'react-dom/client'

// Styles
import './assets/styles/tailwind.css'
import './assets/styles/fonts.css'
import './assets/styles/global.css'
import 'animate.css';


import Routes from './utils/routes.jsx'
import { WindowSizeProvider } from './utils/context/Responsive.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WindowSizeProvider>
      <Routes/>
    </WindowSizeProvider>
  </React.StrictMode>,
)
