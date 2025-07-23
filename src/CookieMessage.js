//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

import { cookiesManagement } from "./Logical/CookiesManagement";

function CookieMessage() {
    function CloseButton() {
        const divCookieMessage = document.getElementById("cookieMessage");

        divCookieMessage.style.display = "none";

        SetTokenCookie();
    };

    function GetCookieAuth() {
        const cookieauth = cookiesManagement.getCookie("cookieauth");

        //https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript
        return !!cookieauth;
    };

    function SetTokenCookie() {
        const datefinish = new Date(Date.now() + 500 * 86400);

        const cookie = `cookieauth=true;expires=${datefinish}`;

        document.cookie = cookie;
    };

    return (
        !GetCookieAuth() &&
        <div id="cookieMessage" style={
            {
                zIndex: "1000",
                width: "200px",
                position: "fixed",
                bottom: "60px",
                border: "solid 2px",
                marginLeft: "20px",
                padding: "10px",
                background: "black"
            }
        }>
            <span>
                {langReference(GetLanguaje()).cookiesMessage}
            </span>
            <button onClick={CloseButton}>
                {langReference(GetLanguaje()).accept}
            </button>
        </div>
    );
}

export default CookieMessage;
