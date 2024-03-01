import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function ProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    function GetProduct(id) {
        fetch(`https://localhost:7222/api/Products/${id}`,
            {
                method: 'GET'
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
            <h1>Producto: </h1>
            <p>
                {product.name}
            </p>
            <h3>Descripción:</h3>
            <p>
                {product.description}
            </p>
            <h3>Nutrients:</h3>
            <p>
                {product.nutrients}
            </p>
        </div>
    )
}

export default ProductView;