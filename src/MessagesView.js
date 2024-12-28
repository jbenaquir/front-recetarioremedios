import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function MessageView() {
    const { id } = useParams();
    const [Message, setMessage] = useState({});

    function GetMessage(id) {
        // setMessage()
        
//
        /*
        fetch(`https://localhost:7222/api/Messages/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setMessage(data);
            })
            .catch((error) => console.log("Something happened getting Message: " + error));)
//
            */
    }

    useEffect(() => {
        GetMessage(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Message: </h1>
            <p>
                {Message.name}
            </p>
            <h3>Descripción:</h3>
            <p>
                {Message.description}
            </p>
            <h3>Nutrients:</h3>
            <p>
                {Message.nutrients}
            </p>
        </div>
    )
}

export default MessageView;