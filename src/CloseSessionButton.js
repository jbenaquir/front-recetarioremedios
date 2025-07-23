import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';
//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";


function CloseSessionButton() {
    function SetTokenCookie(token, datefinish) {
        //SOLVE: (request message required)

        const cookie = `token=${token};expires=${datefinish}`;

        document.cookie = cookie;
    }

    function FinishSession() {
        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        return fetch(`${netapi}/UserTokens/finishSession/`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(authentication.GetToken())
            })
            .catch((error) => console.log("Something happened finishing session: " + error))
            .finally(() => {
                const datefinish = new Date(Date.now());

                SetTokenCookie("", datefinish);
        
                window.location.href = `/login`;
            });
    }
    return (
        <button
            style={{ paddingLeft: "0px" }}
            class="btn col col-md-auto"
            onClick={FinishSession}>
            <span>
                {langReference(GetLanguaje()).close} session
            </span>
            <i style={{ marginLeft: "6px" }} class="bi-power"></i>
        </button>
    )
}

export default CloseSessionButton;
