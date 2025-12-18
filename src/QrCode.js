import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";

function QrCode(params) {
    const { id } = useParams();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            Scan this qr code with your phone
            <br />
            <QRCode value={`https://${document.domain}/chat/${id}`} />
        </div>
    )
}

export default QrCode;


