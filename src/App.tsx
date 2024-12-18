// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import About from './AboutPage';
import HomePage from './HomePage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductsPage from './ProductsPage';
import Blog from './Blog';
import ContactUs from './ContactUs';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/products",
    element:<ProductsPage/>
  },
  {
    path:'/blog',
    element:<Blog/>
  },
  {
    path:'/contactUs',
    element:<ContactUs/>
  }
])
function App() {
 
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
