import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';
import { qrcodeLib } from './Libraries/qrcode';

function QrCode(params) {
    const { id } = useParams();
    //SAMPLE const [var, setVar] = useState('');
    const [imageQrCode, setImageQrCode] = useState('');

    useEffect(() => {
        // const whaisthis = new QRCode("test", {"text": "test!!!"});
        debugger;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            QR CODE OF PARAMETER STRING
            {imageQrCode}
        </div>
    )
}

export default QrCode;


