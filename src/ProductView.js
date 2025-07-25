//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function ProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    function GetProduct(id) {
        fetch(`${netapi}/Products/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch((error) => console.log("Something happened getting product: " + error));
    }

    useEffect(() => {
        GetProduct(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>{langReference(GetLanguaje()).product}: </h1>
            <p>
                {product.name}
            </p>
            <h3>{langReference(GetLanguaje()).description}:</h3>
            <p>
                {product.description}
            </p>
            <h3>{langReference(GetLanguaje()).nutrients}:</h3>
            <p>
                {product.nutrients}
            </p>
        </div>
    )
}

export default ProductView;