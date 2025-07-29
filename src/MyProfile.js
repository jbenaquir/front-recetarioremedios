//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

import { useEffect, useState } from "react";
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function ProductView() {
    const [id, setId] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        // LoadReturnUrl();

        let currentUserId = authentication.GetCurrentUserId();

        setId(currentUserId);

        GetUser(currentUserId);
    }, []);

    function GoToUpdatePassword() {
        const returnUrl = `/myprofile`;
        window.location.href = `/updatepassword?returnUrl=${returnUrl}`;
    }

    const GoToUpdateMyProfile = () => {
        const returnUrl = `/myprofile`;
        window.location.href = `/updateprofile?returnUrl=${returnUrl}`;
    }

    function GetUser(id) {
        fetch(`${netapi}/Users/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
            .catch((error) => console.log("Something happened getting product: " + error));
    }

    function GoToChat() {
        const username = authentication.GetCurrentUserName();

        window.location.href = `/chat/chatof${username}-${id}`;
    }
    /*
    function LoadReturnUrl() {
        const params = new URLSearchParams(window.location.search);
        
        const _returnUrl = params.get('returnUrl');
        if(_returnUrl !== null){
            setReturnUrl(_returnUrl);
        }
    }*/

    return (
        <div>
            <h1>{langReference(GetLanguaje()).profile}: <i class="bi-person-circle"></i></h1>
            <p>
                <h3>username:</h3>
                {user.username}
            </p>
            {
                user.email != null
                &&
                <p>
                    <h3><i class="bi-envelope"></i> email:</h3>
                    {user.email}
                </p>
            }
            {
                user.phone != null
                &&
                <p>
                    <h3><i class="bi-phone"></i> {langReference(GetLanguaje()).phone}:</h3>
                    {user.phone}
                </p>
            }
            <p>
                <h3>{langReference(GetLanguaje()).role}:</h3>
                {user.roleName}
            </p>
            <p>
                <button
                    style={{
                        minWidth: "100px",
                        "margin-right": "10px", "margin-left": "10px"
                    }}
                    class="btn btn-primary col col-md-auto"
                    onClick={GoToUpdatePassword}>
                    <i class="bi-lock"></i>
                    {langReference(GetLanguaje()).modify} {langReference(GetLanguaje()).password}
                </button>
                <button
                    style={{
                        minWidth: "100px",
                        "margin-right": "10px", "margin-left": "10px"
                    }}
                    class="btn btn-primary col col-md-auto"
                    onClick={GoToUpdateMyProfile}>
                    <i class="bi-person"></i>
                    {langReference(GetLanguaje()).modify} {langReference(GetLanguaje()).profile}
                </button>
                <button
                    style={{
                        minWidth: "100px",
                        "margin-right": "10px", "margin-left": "10px"
                    }}
                    class="btn btn-primary col col-md-auto"
                    onClick={GoToChat}>
                    My Chat
                    <i i style={{
                        "padding": "5px"
                    }} class="bi-chat"></i>
                </button>

            </p>
        </div>
    )
}

export default ProductView;