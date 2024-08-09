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
import UserView from './UserView';
import UserForm from './UserForm';
import CloseSessionButton from './CloseSessionButton';

const router = createBrowserRouter([
  {
    path: "/", element: <App />
  },
  {
    path: "/login", element: <Login />
  },
  {
    path: "/users", element: <Users />
  },
  {
    path: "/users/:id/view", element: <UserView />
  },
  {
    path: "/users/create", element: <UserForm />
  },
  {
    path: "/users/:id/edit", element: <UserForm />
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
////////////////
//MOVE TO NEW .js
//https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const GetToken = () => {
  const cookieToken = getCookie("token");

  return cookieToken === "" ? null : JSON.parse(cookieToken);
}

const authenticated = () => {
  const token = GetToken();

  return token != null;
}
//MOVE TO NEW .js
/////////////////
root.render(
  <React.StrictMode>
    <nav class="navbar bg-primary fixed-top">
      {
        authenticated() &&
        <div class="container-fluid"
          style={{
            display: authenticated() ? "" : "none"
          }} >
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
    <div class="container-sm" style={{ "padding-top": "60px" }}>
      {/*jbenavides: This is a comment in a tag in React*/}
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
