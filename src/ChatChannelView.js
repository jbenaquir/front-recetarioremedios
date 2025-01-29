import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function ProductView() {
    const { id } = useParams();
    const [chatChannel, setChatchannel] = useState({});

    function GoToChatChannelSessions() {
        const returnUrl = `/chatChannels/${id}/view`;
        window.location.href = `/chatChannelsSessions/${id}?returnUrl=${returnUrl}`;
    }

    function GetUser(id) {
        fetch(`https://localhost:7222/api/ChatChannels/getwithid/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setChatchannel(data);
            })
            .catch((error) => console.log("Something happened getting chatchannel: " + error));
    }

    useEffect(() => {
        GetUser(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Chat Channel: </h1>
            <p>
                {chatChannel.name}
            </p>
            <p>
                <button
                    style={{
                        minWidth: "100px",
                        "margin-right": "10px", "margin-left": "10px"
                    }}
                    class="btn btn-primary col col-md-auto"
                    onClick={GoToChatChannelSessions}>
                    View Channel Sessions
                </button>
            </p>
        </div>
    )
}

export default ProductView;