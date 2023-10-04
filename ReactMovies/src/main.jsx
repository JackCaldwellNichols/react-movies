import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext/AuthContext.jsx'
import { MovieContext, MovieContextProvider } from './Context/MovieContext/MovieContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider> 
      <MovieContextProvider>
      <App />
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
