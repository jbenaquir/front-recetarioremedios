//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

import { authentication } from './Logical/Authentication';
import { useEffect, useState } from 'react';
import netapi from './variables/apiurls';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [returnUrl, setReturnUrl] = useState('');

    useEffect(() => {
        LoadReturnUrl();

        if (authentication.authenticated()) {
            window.location.href = `/`;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function LoadReturnUrl() {
        const params = new URLSearchParams(window.location.search);

        const _returnUrl = params.get('returnUrl');
        if (_returnUrl !== null) {
            setReturnUrl(_returnUrl);
        }
    }


    function SetTokenCookie(token, datefinish) {
        const cookie = `token=${token};expires=${datefinish}`;

        document.cookie = cookie;
    }

    //Promises course
    //https://www.codecademy.com/courses/asynchronous-javascript/lessons/promises/exercises/introduction
    function Authorize(userToken) {
        //load this in cookie (request message required)
        const datefinish = new Date(Date.now() + 500 * 86400);

        SetTokenCookie(JSON.stringify(userToken), datefinish);

        if (returnUrl !== "") {
            window.location.href = returnUrl;
            return;
        }

        window.location.href = `/`;
    }

    function Verify() {
        let validationErrors = "Verify:";

        if (name === "") {
            validationErrors += "\n- Name is empty";
        }

        if (password === "") {
            validationErrors += "\n- Password is empty";
        }

        if (validationErrors !== "Verify:") {
            window.alert(validationErrors);
            return false;
        }

        return true;
    }

    function Authenticate() {
        if (!Verify()) {
            return;
        }

        var userToken = {
            name: name,
            password: password
        }

        return fetch(`${netapi}/UserTokens/checkPassWord/`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userToken)
            })
            .then((response) => {
                return response.json();
            })
            .then((convertedData) => {
                if (convertedData.message !== "") {
                    alert(convertedData.message);
                } else {
                    Authorize(convertedData.data);
                }
            })
            .catch((error) => console.log("Something happened saving user: " + error));
    }

    function GoToCreateAccount() {
        window.location.href = `/createAccount?returnUrl=/login`;
    }

    return (
        <div class="border" style={{ "max-width": "300px", "padding": "10px" }}>
            <div style={{ "padding": "30px" }}>
                <h1>{langReference(GetLanguaje()).authenticate}</h1>
                <div class="form-group row">
                    <input
                        class="form-control"
                        name="name"
                        placeholder="Username"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        maxLength={100} />
                    <input
                        class="form-control"
                        type="password"
                        name="password"
                        placeholder={langReference(GetLanguaje()).password}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        maxLength={100} />
                </div>
                <div class="form-group row" style={{ marginTop: "10px" }}>
                    <button
                        type="button"
                        class="btn btn-primary btn-block"
                        onClick={Authenticate}>
                        <i style={{ marginRight: "6px" }} class="bi-rocket"></i>
                        <span>
                            {langReference(GetLanguaje()).login}
                        </span>
                    </button>
                    <div style={{
                        "text-align": "center"
                    }}>
                        -{langReference(GetLanguaje()).or}-
                    </div>
                    <button
                        type="button"
                        class="btn btn-primary btn-block"
                        onClick={GoToCreateAccount}>
                        <i style={{ marginRight: "6px" }} class="bi-person-fill"></i>
                        <span>
                            {langReference(GetLanguaje()).addAccount}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;