//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function MessagesView() {
    // eslint-disable-next-line 
    const { channelofUserId: userid, channelsessionId } = useParams();
    const [MessageText, setMessageText] = useState('');
    const [StatusMessage, setStatusMessage] = useState('');
    const currentUserId = authentication.GetCurrentUserId();

    useEffect(() => {
        const returnUrl = `/chat/${channelsessionId}`;

        if (!authentication.authenticated()) {
            return window.location = `/login?returnUrl=${returnUrl}`;
        }

        UpdateMessages();
        GetMessagesTInit();

        
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

    //function in a variable or const 
    const UpdateMessages = () => {
        GetMessagesFromServer();
    };

    const GetMessagesFromServer = () => {

        if (channelsessionId) {

            setStatusMessage(langReference(GetLanguaje()).gettingMessagesFromServer);

            fetch(`${netapi}/ChatMessages/get/${channelsessionId}`,
                {
                    method: 'GET',
                    headers: authentication.GetAuthorizationHeaders()
                })
                .then(response => response.json())
                .then(data => {
                    //message safed
                    // setMessage(data);
                    LoadMessagesInContainer(data);
                    return;
                })
                .catch((error) => console.log("Something happened getting Message: " + error))
                .finally(() => {
                    setStatusMessage("");
                });
        }
        else {
            window.location = "/"
        }
    }

    const LoadMessagesInContainer = (data = []) => {
        let messagesDivs = '';

        // eslint-disable-next-line 
        if (data == []) {
            return;
        }

        data.forEach(message => {
            //left is me
            if (message == null) {
                return;
            }

            let messageDirecction = "Left";

            console.log("currentUserId:" + currentUserId);

            if (Number.parseInt(message.sentBy) === Number.parseInt(currentUserId)) {
                messageDirecction = "Right";
            }

            let containerMessage = document.getElementById(`containerMessage${messageDirecction}Sample`).cloneNode(true);

            containerMessage.id = "";

            //if(messageDirecction == "Right"){
            //(containerMessage.getElementsByClassName("sendBy")[0]).innerHTML = message.sentBy;
            //}

            (containerMessage.getElementsByClassName("messageText")[0]).innerHTML = message.messageText;

            const messageDate = message.sendAt.toString();

            if (messageDate !== "") {
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

                (containerMessage.getElementsByClassName("hour")[0]).innerHTML = new Date(message.sendAt.toString()).toLocaleString(loc);
            }

            console.log(new Date(message.sendAt.toString()).toDateString());

            // (containerMessage.getElementsByClassName("hour")[0]).innerHTML = Date.parse(message.sendAt.toString());

            messagesDivs += containerMessage.outerHTML;
        });

        (document.getElementsByClassName("containerMessages")[0]).innerHTML = messagesDivs;
    };

    //https://www.w3schools.com/jsref/met_win_clearinterval.asp
    const intervalLoadMessageT = () => {
        const secs = 5;
        //  alert(`Getting messages every: ${secs} secs`)

        setInterval(function () {
            UpdateMessages();
        }, (secs * 1000));
    }

    const StopGettingMessages = () => {
        // not stopping
        clearInterval(intervalLoadMessageT);
    };

    const RedirectToProductsAndServc = () => {
        window.location = `/productsandservices?chatId=${channelsessionId}`;
    }

    const GetMessagesTInit = () => {
        //UpdateMessages();
        intervalLoadMessageT();

        //filter for channelsessionId by param
    }

    function SendMessage(fromParameter) {

        if (!channelsessionId) {
            alert(`Channel Session ${langReference(GetLanguaje()).isEmpty}`);

            window.location = "/";
            return;
        }

        const userId = authentication.GetCurrentUserId();

        if (!userId) {
            alert("Not user auth");
            window.location = "/login";
            return;
        }

        let chatMessage = {
            "chatMessage": "string",
            "channelSessionId": channelsessionId,
            "messageText": "",
            "sentBy": userId.toString()
        }

        if (fromParameter == null) {
            if (MessageText === '') {
                alert(`${langReference(GetLanguaje()).message} ${langReference(GetLanguaje()).isEmpty}`);
                return;
            }

            chatMessage = {
                "chatMessage": "string",
                "channelSessionId": channelsessionId,
                "messageText": MessageText,
                "sentBy": userId.toString()
            }
        } else {
            chatMessage = {
                "chatMessage": "string",
                "channelSessionId": channelsessionId,
                "messageText": fromParameter,
                "sentBy": userId.toString()
            }
        }

        alert(`${langReference(GetLanguaje()).sendingMessage}...`);


        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`${netapi}/ChatMessages/send`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(chatMessage)
            })
            .then(response => {

                if (response.status === 200) {
                    alert(`${langReference(GetLanguaje()).sentMessage}`);

                    if (fromParameter != null) {
                        window.location = `/chat/${channelsessionId}/`;
                    } else {
                        setMessageText('');
                    }

                    UpdateMessages();

                    return;
                }

                if (response.status === 400) {
                    alert('ServerError 400');
                    setMessageText('');
                    return;
                }
            })
            .catch((error) => {
                console.log("Something happended sending message: " + error);
                alert("Something happended sending message. Message wasn't sent");
            });

    }

    function NotImplemented() {
        alert('Not implemented');
        console.log('Not implemented yet')
    }


    const containerMessagesStyle =
    {
        "height": "70%",
        "overflow-y": "scroll"
    }

    // css flex
    // https://css-tricks.com/snippets/css/a-guide-to-flexbox/

    //justify-content: start;

    //justify-content: end;

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

    const chatButtonsContainerStyle = {
        "justify-content": "center",
        "display": "flex",
    };


    window.onresize = (event) => {

    }

    return (
        <>
            {
                authentication.authenticated()
                &&
                <div style={{
                    "height": window.innerHeight
                }}>
                    <div style={containerMessageStyle} class="containerMessageRight" id="containerMessageRightSample">
                        <div style={arrowsMessageTextStyle} className="arrowLeft">
                            {"<"}
                        </div>
                        <div style={messageTextStyle}>
                            <div>
                                <b>Me:</b>
                            </div>
                            <div class="messageText">
                                Message Text Left
                            </div>
                            <div class="hour" style={hourStyle}>
                                hour
                            </div>
                        </div>
                    </div>

                    <div style={containerMessageStyle} class="containerMessageLeft" id="containerMessageLeftSample">
                        <div style={messageTextStyle}>
                            <div class="messageText">
                                Message Text Right
                            </div>
                            <div class="hour" style={hourStyle}>
                                hour
                            </div>
                        </div>
                        <div style={arrowsMessageTextStyle} className="arrowRight">
                            {">"}
                        </div>
                    </div>

                    <div style={containerMessagesStyle} class="containerMessages">

                    </div>

                    <div
                        style={{ "font-size": "12px" }}>
                        {StatusMessage}
                    </div>

                    <div style={
                        {
                            "position": "fixed",
                            "z-index": 3,
                            "bottom": "0px",
                            "text-align": "center",
                            "margin": "0 auto",
                            "width": "auto"
                        }
                    }
                    >
                        <div>
                            <input
                                class="form-control"
                                name="message"
                                value={MessageText}
                                onChange={e => setMessageText(e.target.value)}
                                maxLength={100} />
                        </div>
                        <div style={chatButtonsContainerStyle}>
                            <button
                                style={{ margin: "5px" }}
                                class="btn btn-blue"
                                title="Send Text Message"
                                onClick={() => SendMessage(null)}>
                                <i class="bi-send"></i>
                                <div>
                                    {langReference(GetLanguaje()).save}

                                </div>
                            </button>
                            <button
                                style={{ margin: "5px" }}
                                class="btn btn-blue"
                                title="Send Text Message"
                                onClick={() => UpdateMessages()}>
                                <i class="bi-arrow-clockwise"></i>
                                <div>
                                    {langReference(GetLanguaje()).getMessages}
                                </div>
                            </button>
                            <button
                                style={{ margin: "5px", display: "none" }}
                                class="btn btn-blue"
                                title="Send Text Message"
                                onClick={() => StopGettingMessages()}>
                                <i class="bi-loading"></i>
                                <div>
                                    Turn off: Getting Messages
                                </div>
                            </button>
                            <button
                                style={{ margin: "5px", display: "none" }}
                                class="btn btn-blue"
                                title="Voice"
                                onClick={() => NotImplemented()}>
                                <i class="bi-mic"></i>
                                <div>
                                    Send Voice
                                </div>
                            </button>
                            <button
                                style={{ margin: "5px" }}
                                class="btn btn-blue"
                                title={langReference(GetLanguaje()).servicesAndProducts}
                                onClick={() => RedirectToProductsAndServc()}>
                                <div>
                                    {langReference(GetLanguaje()).servicesAndProducts}
                                </div>
                            </button>
                        </div>
                    </div>

                </div >
            }
        </>
    )
}

export default MessagesView;