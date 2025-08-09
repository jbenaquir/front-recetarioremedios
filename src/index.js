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
import Companies from './Companies';
import CompanyForm from './CompanyForm';
import CompanyView from './CompanyView';
import UpdatePasswordForm from './UpdatePasswordForm';
import MyProfile from './MyProfile';
import UserView from './UserView';
import UserForm from './UserForm';
import UserFormEditProfile from './UserFormEditProfile';
import UpdatePasswordFormCurrentUser from './UpdatePasswordFormCurrentUser';
import CloseSessionButton from './CloseSessionButton';
import CookieMessage from './CookieMessage';
import MessagesView from './MessagesView';
import ChatChannels from './ChatChannels';
import ChatChannelForm from './ChatChannelForm';
import ChatChannelView from './ChatChannelView';
import ProductsAndServices from './ProductsAndServices';
import { authentication } from './Logical/Authentication';
import LanguajePicker from './components/LanguajePicker'
//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

const routes = [
  {
    path: "/",
    element: <App />
  }];

routes.push({
  path: "/login", element: <Login />
});

routes.push({
  path: "/createAccount", element: <UserForm />
});

routes.push({
  path: "/chat/:channelsessionId", element: <MessagesView />
});

routes.push({
  path: "/productsandservices", element: <ProductsAndServices />
});

if (authentication.authenticated()) {
  routes.push({
    path: "/users/:id/updatepassword", element: <UpdatePasswordForm />
  });

  routes.push({
    path: "/chat", element: <MessagesView />
  });

  routes.push({
    path: "/chatTo/:userid", element: <MessagesView />
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

  //Personal profile
  routes.push({
    path: "/myprofile", element: <MyProfile />
  });

  routes.push({
    path: "/updateprofile", element: <UserFormEditProfile />
  });

  routes.push({
    path: "/updatepassword", element: <UpdatePasswordFormCurrentUser />
  });
  //Personal profile

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

  routes.push({
    path: "/chatchannels", element: <ChatChannels />
  });

  routes.push({
    path: "/chatchannels/create", element: <ChatChannelForm />
  });

  routes.push({
    path: "/chatchannels/:id/edit", element: <ChatChannelForm />
  });

  routes.push({
    path: "/chatchannels/:id/view", element: <ChatChannelView />
  });


}

if (authentication.authenticated() && authentication.IsAdmin()) {
  // here goes scrum for roles also mayb

  routes.push({
    path: "/companies/", element: <Companies />
  });

  routes.push({
    path: "/companies/create", element: <CompanyForm />
  });

  routes.push({
    path: "/companies/:id/edit", element: <CompanyForm />
  });

  routes.push({
    path: "/companies/:id/view", element: <CompanyView />
  });
}

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <nav class="navbar bg-primary fixed-top">
      <div class="container-fluid" >
        <a class="navbar-brand" href="/">Curame</a>
        <LanguajePicker />
        {
          authentication.authenticated() ?
            <>
              {/*Menu toggle button*/}
              <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Curame</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                  {/* Menu */}
                  <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/">{langReference(GetLanguaje()).home}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/chatchannels">Chat:{langReference(GetLanguaje()).channel}s</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/products">{langReference(GetLanguaje()).product}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/recipes">{langReference(GetLanguaje()).recipes}</a>
                    </li>
                    {
                      (authentication.IsAdmin() || authentication.IsCompanyOwner())
                        ?
                        <>
                          <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/users">Users</a>
                          </li>
                        </>
                        :
                        <></>
                    }
                    {
                      (authentication.IsAdmin())
                        ?
                        <>
                          <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/companies">{langReference(GetLanguaje()).Company}</a>
                          </li>
                        </>
                        :
                        <></>
                    }
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/myprofile">{langReference(GetLanguaje()).my} {langReference(GetLanguaje()).profile}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/updateprofile">{langReference(GetLanguaje()).update} {langReference(GetLanguaje()).profile}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/updatepassword">{langReference(GetLanguaje()).update} {langReference(GetLanguaje()).password}</a>
                    </li>
                    <li class="nav-item">
                      <CloseSessionButton />
                    </li>
                  </ul>
                </div>
              </div>
            </>
            :
            <></>
        }
        
      </div>
    </nav>
    <div class="container-sm" style={{ paddingTop: "60px" }}>
      {/*jbenavides: This is a comment in a tag in React*/}
      <RouterProvider router={router} />
    </div>
    <CookieMessage />
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
