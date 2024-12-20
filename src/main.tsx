import ReactDOM from 'react-dom/client'

// Styles
import './assets/styles/tailwind.css'
import './assets/styles/fonts.css'
import './assets/styles/global.css'
import 'animate.css';


import { WindowSizeProvider } from './utils/context/Responsive.js'
import { ParallaxProvider } from 'react-scroll-parallax'
import { FirebaseProvider } from './utils/context/FirebaseProvider.js'
import { AppRoutes } from './utils/routes.js'
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ParallaxProvider>
      <FirebaseProvider>
        <WindowSizeProvider>
          <AppRoutes />
        </WindowSizeProvider>
      </FirebaseProvider>
    </ParallaxProvider>
  // </React.StrictMode>
)
