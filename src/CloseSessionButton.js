function CloseSessionButton() {
    function SetTokenCookie(token, datefinish) {
        const cookie = `token=${token};expires=${datefinish}`;

        document.cookie = cookie;
    }

    function FinishSession() {
        //load this in cookie (request message required)
        const datefinish = new Date(Date.now());
        // const datefinish = new Date(Date.now() - 500 * 86400);

        SetTokenCookie("", datefinish);

        //clean token
        window.location.href = `/login`;
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
