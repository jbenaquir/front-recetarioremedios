import { authentication } from './Logical/Authentication';

function CloseSessionButton() {
    function SetTokenCookie(token, datefinish) {
        //SOLVE: (request message required)

        const cookie = `token=${token};expires=${datefinish}`;

        document.cookie = cookie;
    }

    function FinishSession() {
        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        return fetch(`https://localhost:7222/api/UserTokens/finishSession/`,
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
                Close session
            </span>
            <i style={{ marginLeft: "6px" }} class="bi-power"></i>
        </button>
    )
}

export default CloseSessionButton;
