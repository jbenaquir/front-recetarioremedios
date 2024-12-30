import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function MessagesView() {
    const { channelofUserId: userid, channelsessionId } = useParams();
    const [MessageText, setMessageText] = useState('');
    const [ChatMessage, setChatMessage] = useState('');
    const [Messages, setMessages] = useState([]);

    let messagestemp = [
        { "MessageText": "TestNOsessionFirstMessage", SendBy: 1 },
        { "MessageText": "Test1", ChannelSessionId: "123", SendBy: 1 },
        { "MessageText": "Test2", ChannelSessionId: "123", SendBy: 2 },
        { "MessageText": "Test3", ChannelSessionId: "123", SendBy: 2 },
        { "MessageText": "Test4", ChannelSessionId: "123", SendBy: 1 },
        { "MessageText": "Test5", ChannelSessionId: "123", SendBy: 3 }
    ];

    //function in a variable or const 
    const UpdateMessages = () => {
        GetMessagesFromServer();
    };

    const GetMessagesFromServer = () => {
        /*
            
            fetch(`https://localhost:7222/api/ChatMessages/${userid}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                //message safed
    
                setMessage(data);
            })
            .catch((error) => console.log("Something happened getting Message: " + error));)
    
    
            fetch(`https://localhost:7222/api/ChatMessages/${channelsessionId}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                //message safed
                setMessage(data);
            })
            .catch((error) => console.log("Something happened getting Message: " + error));)
    
        */

        messagestemp = [
            { "MessageText": "Test1 server", ChannelSessionId: "123", SendBy: 1 },
            { "MessageText": "Test2 server", ChannelSessionId: "123", SendBy: 2 },
            { "MessageText": "Test3 server", ChannelSessionId: "123", SendBy: 2 },
            { "MessageText": "Test4 server", ChannelSessionId: "123", SendBy: 1 },
            { "MessageText": "Test5 server", ChannelSessionId: "123", SendBy: 3 }
        ];

        console.log("Messages:", messagestemp);

        LoadMessagesInContainer();
    }

    const LoadMessagesInContainer = () => {
        messagestemp.forEach(message => {
            console.log(message);
        });
    };

    //https://www.w3schools.com/jsref/met_win_clearinterval.asp
    const intervalLoadMessageT = () => {
        const secs = 5 * 1000;

        setInterval(function () {
            UpdateMessages();
            console.log("Getting messages", messagestemp);
        }, secs);
    }

    const StopGettingMessages = () => {
        // not stopping
        clearInterval(intervalLoadMessageT);
    };

    function GetMessagesTInit() {
        intervalLoadMessageT();
        //filter for channelsessionId by param

    }

    function SendMessage() {
        if (MessageText == '') {
            alert('Message is empty')
            return;
        }

        alert('Sending message');

        let ChatMessage = { "MessageText": MessageText, ChannelSessionId: channelsessionId, SendBy: authentication.GetCurrentUserId() };
        console.log(ChatMessage);

        alert('Sent');

        setMessageText('');
    }
    function NotImplemented() {
        alert('Not implemented');
        console.log('Not implemented yet')
    }

    useEffect(() => {
        GetMessagesTInit();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);


    const containerMessagesStyle =
    {
        "height": "300px"
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

    return (
        <div>
            <div style={containerMessagesStyle} class="containerMessages">

                <div style={containerMessageStyle} class="containerMessageRight">
                    <div style={arrowsMessageTextStyle} className="arrowLeft">
                        {"<"}
                    </div>
                    <div style={messageTextStyle}>
                        <div>
                            Message Text Left
                        </div>
                        <div style={hourStyle}>
                            hour
                        </div>
                    </div>
                </div>

                <div style={containerMessageStyle} class="containerMessageLeft">
                    <div style={messageTextStyle}>
                        <div>
                            Message Text Right
                        </div>
                        <div style={hourStyle}>
                            hour
                        </div>
                    </div>
                    <div style={arrowsMessageTextStyle} className="arrowRight">
                        {">"}
                    </div>
                </div>



            </div>
                <div>
                    <input
                        class="form-control"
                        name="message"
                        value={MessageText}
                        onChange={e => setMessageText(e.target.value)}
                        maxLength={100} />
                </div>
                <div style={chatButtonsContainerStyle }>
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
                        <i class="bi-loading"></i>
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
    )
}

export default MessagesView;