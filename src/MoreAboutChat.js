import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import QrCode from './QrCode';
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";


function MoreAboutChat() {
    const { id } = useParams();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Subscribe = () => {

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
            <button
                style={{
                    minWidth: "100px",
                    "margin-right": "10px", "margin-left": "10px"
                }}
                class="btn btn-primary col col-md-auto"
                onClick={Subscribe}>
                Subscribe to this Chat
                <i i style={{
                    "padding": "5px"
                }} class="bi-pin-angle"></i>
            </button>
        </div>
    )
}

export default MoreAboutChat;