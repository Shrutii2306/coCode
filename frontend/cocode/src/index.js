import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Error from './components/Error';
import { Home } from './components/Home';
import Session from './components/Session';
const root = ReactDOM.createRoot(document.getElementById('root'));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path:"/",
        element: <SignUp/>,
        errorElement: <Error/>
      },
      {
        path: "/login",
        element: <Login/>,
        errorElement: <Error />
      },
      {
        path: "/home",
        element: <Home/>,
        errorElement: <Error />
      },
      {
        path: "/session",
        element : <Session />,
        errorElement: <Error/>
      }
    ],
    errorElement: <Error/>
  },
  
  
])
root.render(<RouterProvider router={appRouter}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
