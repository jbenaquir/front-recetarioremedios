//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication.js';
import netapi from './variables/apiurls.js';

function ImageView() {
    const { id } = useParams();
    const [image, setImage] = useState({});

    function GetImage(id) {
        fetch(`${netapi}/Images/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setImage(data);
            })
            .catch((error) => console.log("Something happened getting image: " + error));
    }

    useEffect(() => {
        GetImage(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>{langReference(GetLanguaje()).id}: </h1>
            <p>
                {image.id}
            </p>
            <h3>{langReference(GetLanguaje()).moreAboutThisImage}:</h3>
            <p>
                {image.more}
            </p>
            <p>
                {image.filePath}
            </p>
            <p>
                {
                    (image.filePath)
                    &&
                    <img src={`${netapi}/Images/src/${image.filePath}`}
                        alt={image.more}
                    />
                }
            </p>
        </div>
    )
}

export default ImageView;