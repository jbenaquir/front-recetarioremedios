import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Login from './Login';
import Products from './Products';
import ProductView from './ProductView';
import ProductForm from './ProductForm';
import Recipes from './Recipes';
import RecipeView from './RecipeView';
import RecipeForm from './RecipeForm';
import Users from './Users';
import UpdatePasswordForm from './UpdatePasswordForm';
import UserView from './UserView';
import UserForm from './UserForm';
import CloseSessionButton from './CloseSessionButton';
import CookieMessage from './CookieMessage';
import { authentication } from './Logical/Authentication';

const routes = [
  {
    path: "/", element: <App />
  }];

routes.push({
  path: "/login", element: <Login />
});

routes.push({
  path: "/login", element: <Login />
});

if (authentication.authenticated()) {
  routes.push({
    path: "/users/:id/updatepassword", element: <UpdatePasswordForm />
  });
  routes.push({
    path: "/users", element: <Users />
  });
  routes.push({
    path: "/users/:id/view", element: <UserView />
  });
  routes.push({
    path: "/users/create", element: <UserForm />
  });
  routes.push({
    path: "/users/:id/edit", element: <UserForm />
  });
  routes.push({
    path: "/products", element: <Products />
  });
  routes.push({
    path: "/products/:id/:name", element: <ProductView />
  });
  routes.push({
    path: "/products/create", element: <ProductForm />
  });
  routes.push({
    path: "/products/:id/:name/edit", element: <ProductForm />
  });
  routes.push({
    path: "/recipes", element: <Recipes />
  });
  routes.push({
    path: "/recipes/:id/:name", element: <RecipeView />
  });
  routes.push({
    path: "/recipes/create", element: <RecipeForm />
  });
  routes.push({
    path: "/recipes/:id/:name/edit", element: <RecipeForm />
  });
}
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <nav class="navbar bg-primary fixed-top">
      {
        authentication.authenticated() &&
        <div class="container-fluid" >
          <a class="navbar-brand" href="/">RemeDios</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">RemeDios</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              {/* Menu */}
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/users">Users</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/products">Products</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/recipes">Recipes</a>
                </li>
                <li class="nav-item">
                  <CloseSessionButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </nav>
    <div class="container-sm" style={{ paddingTop: "60px" }}>
      {/*jbenavides: This is a comment in a tag in React*/}
      <RouterProvider router={router} />
    </div>
    <CookieMessage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
