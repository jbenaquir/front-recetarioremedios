import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

function QrCode(params) {
    const { id } = useParams();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <p>
                {langReference(GetLanguaje()).scanThisQRCodeW}
            </p>
            <QRCode value={`https://${document.domain}/chat/${id}`} />
        </div>
    )
}

export default QrCode;


