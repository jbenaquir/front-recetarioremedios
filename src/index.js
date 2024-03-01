import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Products from './Products';
import ProductView from './ProductView';
import ProductForm from './ProductForm';
import Recipes from './Recipes';
import RecipeView from './RecipeView';
import RecipeForm from './RecipeForm';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", element: <App />
  },
  {
    path: "/products", element: <Products />
  },
  {
    path: "/products/:id/:name", element: <ProductView />
  },
  {
    path: "/products/create", element: <ProductForm />
  },
  {
    path: "/products/:id/:name/edit", element: <ProductForm />
  },
  {
    path: "/recipes", element: <Recipes />
  },
  {
    path: "/recipes/:id/:name", element: <RecipeView />
  },
  {
    path: "/recipes/create", element: <RecipeForm />
  },
  {
    path: "/recipes/:id/:name/edit", element: <RecipeForm />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*jbenavides: This is a comment in a tag in React*/}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
