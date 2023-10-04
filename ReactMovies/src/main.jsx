import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MovieContextProvider } from './Context/MovieContext/MovieContext.jsx'
import { AuthContextProvider } from './Context/AuthContext/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
     
    <MovieContextProvider>
      <App />
    </MovieContextProvider>

    </AuthContextProvider>
  </React.StrictMode>,
)
