import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function MessagesView() {
    const { channelofUserId: userid, channelsessionId } = useParams();
    const [MessageText, setMessageText] = useState('');
    const [ChatMessage, setChatMessage] = useState('');
    const [Messages, setMessages] = useState([]);
    const currentUserId = authentication.GetCurrentUserId();

    useEffect(() => {
        GetMessagesTInit();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

    //function in a variable or const 
    const UpdateMessages = () => {
        GetMessagesFromServer();
    };

    const GetMessagesFromServer = () => {
        if (channelsessionId) {
            fetch(`https://localhost:7222/api/ChatMessages/get/${channelsessionId}`,
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
                .catch((error) => console.log("Something happened getting Message: " + error));
        }
        else
        {
            window.location = "/"
        }
    }

    const LoadMessagesInContainer = (data = []) => {
        let messagesDivs = '';

        if(data == []) {
            return;
        }

        data.forEach(message => {
//left is me
            if(message == null) {
                return;
            }

            let messageDirecction = "Left";

            console.log("currentUserId" + currentUserId);
            console.log(message);

            if (message.sentBy == currentUserId) {
                messageDirecction = "Right";
            }

            let containerMessage = document.getElementById(`containerMessage${messageDirecction}Sample`).cloneNode(true);

            containerMessage.id = "";
            
            //if(messageDirecction == "Right"){
                //(containerMessage.getElementsByClassName("sendBy")[0]).innerHTML = message.sentBy;
            //}

            (containerMessage.getElementsByClassName("messageText")[0]).innerHTML = message.messageText;

            const messageDate = message.sendAt.toString();

            if(messageDate !== ""){
                (containerMessage.getElementsByClassName("hour")[0]).innerHTML = new Date(message.sendAt.toString()).toDateString();
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
        alert(`Getting messages every: ${secs} secs`)

        setInterval(function () {
            UpdateMessages();
        }, (secs * 1000 ));
    }

    const StopGettingMessages = () => {
        // not stopping
        clearInterval(intervalLoadMessageT);
    };

    const GetMessagesTInit = () => {
        intervalLoadMessageT();
        //filter for channelsessionId by param
    }

    function SendMessage() {
        if (!channelsessionId) {
            alert("Channel Session is empty");
            window.location = "/";
            return;
        }

        const userId = authentication.GetCurrentUserId();

        if (!userId) {
            alert("Channel Session is empty");
            window.location = "/login";
            return;
        }

        if (MessageText == '') {
            alert('Message is empty');
            return;
        }

        alert('Sending message...');

        let chatMessage = {
            "chatMessage": "string",
            "channelSessionId": channelsessionId,
            "messageText": MessageText,
            "sentBy": userId.toString()
          }
          
        console.log(chatMessage);

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`https://localhost:7222/api/ChatMessages/send`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(chatMessage)
            })
            .then(response => {
                
                if (response.status === 200) {
                    alert('Sent.');
                    setMessageText('');
                    
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
        <div style={{
            "height": window.innerHeight
        }}>
            <div style={containerMessageStyle} class="containerMessageRight" id="containerMessageRightSample">
                <div style={arrowsMessageTextStyle} className="arrowLeft">
                    {"<"}
                </div>
                <div style={messageTextStyle}>
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
                        onClick={() => SendMessage()}>
                        <i class="bi-send"></i>
                        <div>
                            Send
                        </div>
                    </button>
                    <button
                        style={{ margin: "5px" }}
                        class="btn btn-blue"
                        title="Send Text Message"
                        onClick={() => UpdateMessages()}>
                        <i class="bi-arrow-clockwise"></i>
                        <div>
                            Get Messages updated
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
                        style={{ margin: "5px" }}
                        class="btn btn-blue"
                        title="Voice"
                        onClick={() => NotImplemented()}>
                        <i class="bi-mic"></i>
                        <div>
                            Send Voice
                        </div>
                    </button>
                </div>
            </div>

        </div >
    )
}

export default MessagesView;