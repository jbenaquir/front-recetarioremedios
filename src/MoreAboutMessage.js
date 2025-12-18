import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import {
    langReference, GetLanguaje
} from "./langs/languajes.js";
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

/*
Cannot set properties of undefined (setting 'chatMessage')
TypeError: Cannot set properties of undefined (setting 'chatMessage')
*/
function MoreAboutMessage() {
    const { id, channelSessionId } = useParams();

    const [chatMessage, setChatMessage] = useState({});

    const GetMessage = () => {
        setChatMessage({
            messageText: "",
            sendAt: ""
        });

        fetch(`${netapi}/ChatMessages/getById/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(response => {
                setChatMessage(response);
                console.log(response);
            })
            .catch((error) => console.log("Something happened getting Message: " + error));
    }

    const DeleteThisMessage = () => {
        if (!window.confirm(langReference(GetLanguaje()).deleteMessagePrompt)) {
            return;
        }

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");


        //EROR: Failed to load resource: the server responded with a status of 404 nof found
        fetch(`${netapi}/ChatMessages/${id}`,
            {
                method: 'DELETE',
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    alert(`${langReference(GetLanguaje()).deletedMessage}`);

                    window.location = `/chat/${channelSessionId}/`;

                    return;
                }

                if (response.status === 400) {
                    alert('ServerError 400');
                    return;
                }
            })
            .catch((error) => {
                console.log("Something happended sending message: " + error);
                alert("Something happended sending message. Message wasn't sent");
            });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        GetMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const containerMessageStyle = {
        "margin": "6px",
        "display": "flex",
        /*"margin-left: -2px;
        "margin-right: -2px;*/
    }

    const messageTextStyle =
    {
        "border": "solid 1px #ff8484",
        "width": "fit-content",
        "max-width": "200px",
        "padding": "7px",
        "border-radius": "7px",
        "font-size": "20px"
    };

    const arrowsMessageTextStyle =
    {
        "margin": "-2px",
        "color": "#ff8484",
        "width": "fit-content"
    };

    let fontSize = Number(messageTextStyle["font-size"].substring([0], [2]));
    fontSize = Number(fontSize);

    const hourStyle = {
        "text-align": "center",
        "font-size": (fontSize - 5).toString() + "px"
    }


    function BeutifyDate() {
        let loc = "";

        switch (GetLanguaje()) {
            case "french":
                loc = "fr-FR"
                break;
            case "spanish":
                loc = "es-CO"
                break;
            default:
                loc = "en-US";
                break;
        }

        return new Date(chatMessage.sendAt).toLocaleString(loc);
    }

    return (
        <div>

            <h1>{langReference(GetLanguaje()).moreAboutChat}: </h1>
            <p>
                <b>Message Id:</b> {id}
            </p>

            <div style={containerMessageStyle}>
                <div style={arrowsMessageTextStyle} className="arrow">
                    {"<"}
                </div>
                <div style={messageTextStyle}>
                    <div className="username">
                        <b>
                            {chatMessage.sentByUsername}:
                        </b>
                    </div>
                    <div className="messageText">
                        {chatMessage.messageText}
                    </div>
                    <hr />
                    <div className="hour" style={hourStyle}>
                        {BeutifyDate(chatMessage.sendAt)}
                    </div>
                </div>
            </div>

            <button
                style={{ margin: "5px" }}
                className="btnDelete btn btn-blue"
                title="Delete"
                onClick={() => DeleteThisMessage(this)}>
                <i class="bi bi-x-circle"></i>
                <div>
                    {langReference(GetLanguaje()).delete}
                </div>
            </button>
        </div>
    )
}

export default MoreAboutMessage;