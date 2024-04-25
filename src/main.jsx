import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login/Login.jsx';
import Signup from './components/SignUp.jsx';
import Generation from './components/Generation/Generation.jsx';
import Validation from './components/Validation/Validation.jsx';
import Events from './components/Events.jsx';
import Fdpgeneration from './components/Fdpgenerate/Fdpgeneration.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/coursegenerate",
    element: <Generation/>,
  },
  {
    path: "/fdpgenerate",
    element: <Fdpgeneration/>,
  },
  {
    path: "/validation",
    element: <Validation/>,
  },
  {
    path: "/events",
    element: <Events/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
