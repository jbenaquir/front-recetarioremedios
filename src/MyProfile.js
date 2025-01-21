import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function ProductView() {
    const [id, setId] = useState({});
    const [user, setUser] = useState({});
    const [returnUrl, setReturnUrl] = useState('');

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
        fetch(`https://localhost:7222/api/Users/${id}`,
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
            <h1>User: <i class="bi-person-circle"></i></h1>
            <p>
                <h3>username:</h3>
                {user.name}
            </p>
            <p>
                <h3><i class="bi-envelope"></i> email:</h3>
                {user.email}
            </p>
            <p>
                <h3><i class="bi-phone"></i> Phone:</h3>
                {user.phone}
            </p>
            <p>
                <h3>Role:</h3>
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
                    Update Password
                </button>
                <button
                    style={{
                        minWidth: "100px",
                        "margin-right": "10px", "margin-left": "10px"
                    }}
                    class="btn btn-primary col col-md-auto"
                    onClick={GoToUpdateMyProfile}>
                    <i class="bi-person"></i>
                    Update My profile
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