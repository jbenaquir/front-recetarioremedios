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
      <nav class="navbar bg-primary fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">RemeDios</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">RemeDios</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/products">Products</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/recipes">Recipes</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div class="container-sm" style={{"padding-top": "60px"}}>
        {/*jbenavides: This is a comment in a tag in React*/}
        <RouterProvider router={router} />
      </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
