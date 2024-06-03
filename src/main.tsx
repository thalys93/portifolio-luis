import React from 'react'
import ReactDOM from 'react-dom/client'

// Styles
import './assets/styles/tailwind.css'
import './assets/styles/fonts.css'
import './assets/styles/global.css'
import 'animate.css';


import Routes from './utils/routes.jsx'
import { WindowSizeProvider } from './utils/context/Responsive.js'
import { ParallaxProvider } from 'react-scroll-parallax'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ParallaxProvider>
      <WindowSizeProvider>
        <Routes />
      </WindowSizeProvider>
    </ParallaxProvider>
  </React.StrictMode>,
)
