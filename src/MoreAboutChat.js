import { useEffect, useState } from "react";
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

    return (
        <div>
            <h1>{langReference(GetLanguaje()).more}: </h1>
            <p>
                <QrCode id={`/chat/${id}`}/>
            </p>
        </div>
    )
}

export default MoreAboutChat;