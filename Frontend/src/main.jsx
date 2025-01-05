import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/routes';
import { UserContextProvider } from './context/user.context';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <StrictMode>
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>
    </StrictMode>
  </UserContextProvider>
)
