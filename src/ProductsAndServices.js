//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

import { useEffect, useState } from 'react';
import { authentication } from './Logical/Authentication.js';
import netapi from './variables/apiurls.js';

function ProductsAndServices() {
    const [products, setProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [productSearch, setProductSearch] = useState('');

    function SendMessage(message) {
        const chatId = GetChatIdParameter();

        if (!chatId) {
            return;
        }

        const userId = authentication.GetCurrentUserId();
        const username = authentication.GetCurrentUserName();

        if (!userId || !username) {
            alert("Not user auth");
            window.location = "/login";
            return;
        }

        let chatMessage = {
            "chatMessage": "string",
            "channelSessionId": chatId,
            "messageText": message,
            "sentBy": userId.toString(),
            "sentByUsername": username.toString()
        }

        alert(`${langReference(GetLanguaje()).sendingMessage}...`);

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`${netapi}/ChatMessages/send`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(chatMessage)
            })
            .then(response => {

                if (response.status === 200) {
                    alert(`${langReference(GetLanguaje()).sentMessage}`);

                    window.location = `/chat/${chatId}/`;

                    return;
                }

                if (response.status === 400) {
                    // alert('ServerError 400');
                    return;
                }
            })
            .catch((error) => {
                console.log("Something happended sending message: " + error);
                alert("Something happended sending message. Message wasn't sent");
            });

    }

    function GetRecipes() {
        fetch('https://bnetremedios.azurewebsites.net/api/Recipes/search',
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
            })
            .catch((error) => console.log("Something happened getting recipes: " + error));
    }

    function GetProducts() {
        fetch(`${netapi}/Products/search`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch((error) => console.log("Something happened getting products: " + error));
    }

    //loads when component mounts
    useEffect(() => {
        const fetchData = async () => {
            GetProducts();
            GetRecipes();
        }

        fetchData();
    }, []);

    useEffect(() => {
        SearchInProducts();
        SearchInRecipes();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productSearch]);

    function GoToViewProduct(product) {
        window.location.href = `/products/${product.id}/${product.name}`;
    }

    function GetChatIdParameter() {
        const params = new URLSearchParams(window.location.search);

        return params.get('chatId');
    }

    function AddProductToChat(product) {
        const chatId = GetChatIdParameter();

        if(!chatId){
            return;   
        }
        const RequestMessage = `${langReference(GetLanguaje()).please}, `;
        const message = SendMessage(`${RequestMessage} <a href="/products/${product.id}/${product.name}">${product.name}</a>`);

        SendMessage(message);
    }

    function AddServcToChat(srvc) {
        const chatId = GetChatIdParameter();

        if(!chatId){
            return;   
        }
        const RequestMessage = `${langReference(GetLanguaje()).please}, `;
        const message = `${RequestMessage} <a href="/recipes/${srvc.id}/${srvc.name}">${srvc.name}</a>`;

        SendMessage(message);
    }

    function GoToView(recipe) {
        window.location.href = `/recipes/${recipe.id}/${recipe.name}`;
    }

    function OnChangeSearch(e) {
        const searchValue = e.currentTarget.value;

        setProductSearch(searchValue);
    }

    function SearchInProducts() {
        const searchValue = productSearch;

        fetch(`${netapi}/Products/search/${searchValue}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch((error) => console.log("Something happened getting products: " + error));
    }

    function SearchInRecipes() {
        const searchValue = productSearch;

        fetch(`${netapi}/Recipes/search/${searchValue}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
            })
            .catch((error) => console.log("Something happened getting recipes: " + error));
    }

    return (
        <div class="grid">
            <div class="row" style={{ margin: "20px" }}>
                <h1 class="col col-9" style={{ textAlign: "center", padding: "9px" }}>{langReference(GetLanguaje()).servicesAndProducts}</h1>
                <div class="input-group" style={{ "margin": "20px 0 20px 0" }}>
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi-search"></i>
                    </span>
                    <input
                        class="col col-3 form-control"
                        placeholder={langReference(GetLanguaje()).search}
                        onChange={(e) => OnChangeSearch(e)} />
                </div>
            </div>
            <div>
                <table style={{ margin: "0px auto" }}>
                    <tbody>
                        {products.length === 0 &&
                            <tr>
                                <td colSpan={2}>{langReference(GetLanguaje()).thereAreNOElementsToShow}</td>
                            </tr>}
                        {products.map(product => (
                            <tr key={product.id}>
                                <td style={{ textAlign: "center" }}>
                                    {product.name}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px", minWidth: "62px" }}
                                        class="btn btn-primary"
                                        title={langReference(GetLanguaje()).view}
                                        onClick={() => GoToViewProduct(product)}>
                                        <i class="bi-eye"></i>
                                        <div>
                                            {langReference(GetLanguaje()).view}
                                        </div>
                                    </button>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px", minWidth: "62px" }}
                                        class="btn btn-primary"
                                        title={langReference(GetLanguaje()).add}
                                        onClick={() => AddProductToChat(product)}>
                                        <i class="bi-plus-circle"></i>
                                        <div>
                                            {langReference(GetLanguaje()).add}
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <table style={{ margin: "0px auto" }}>
                    <tbody>
                        {recipes.length === 0 &&
                            <tr>
                                <td colSpan={2}>{langReference(GetLanguaje()).thereAreNOElementsToShow}</td>
                            </tr>
                        }
                        {recipes.map(recipe => (
                            <tr key={recipe.id}>
                                <td style={{ textAlign: "center" }}>
                                    {recipe.name}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px", minWidth: "62px" }}
                                        class="btn btn-primary"
                                        title="Ver"
                                        onClick={() => GoToView(recipe)}>
                                        <i class="bi-eye"></i>
                                        <div>
                                            {langReference(GetLanguaje()).view}
                                        </div>
                                    </button>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px", minWidth: "62px" }}
                                        class="btn btn-primary"
                                        title={langReference(GetLanguaje()).add}
                                        onClick={() => AddServcToChat(recipe)}>
                                        <i class="bi-plus-circle"></i>
                                        <div>
                                            {langReference(GetLanguaje()).add}
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductsAndServices;