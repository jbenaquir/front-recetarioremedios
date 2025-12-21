import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import QrCode from './QrCode';
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";
import netapi from './variables/apiurls';
import { authentication } from './Logical/Authentication';

function MoreAboutChat() {
    const { id } = useParams();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Subscribe = () => {
        const subscription = {
            userId: authentication.GetCurrentUserId().toString(),
            chatId: id
        };

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`${netapi}/Subscriptions/save`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(subscription)
            })
            .then(response => {
                if (response.status === 200) {
                    alert(langReference(GetLanguaje()).youHaveSubscribed);

                }

                window.location = "/subscriptions";
            })
            .catch((error) => console.log("Something happened saving product: " + error));

    }

    return (
        <div>
            <h1>
                {langReference(GetLanguaje()).more}:
            </h1>
            <p>
                <QrCode id={`/chat/${id}`} />
            </p>
            <p>
                <b>Chat Id:</b> {id}
            </p>
            {
                authentication.authenticated()
                &&
                <button
                    style={{
                        minWidth: "100px",
                        "margin-right": "10px", "margin-left": "10px"
                    }}
                    class="btn btn-primary col col-md-auto no-print"
                    onClick={Subscribe}>
                    {langReference(GetLanguaje()).subscribeThisChat}
                    <i i style={{
                        "padding": "5px"
                    }} class="bi-pin-angle"></i>
                </button>
            }
        </div>
    )
}

export default MoreAboutChat;