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
    }, []);

    return (
        <div>
            <p>
                <h1>Producto: </h1>
                {product.name}
            </p>
            <p>
                <h3>Descripción:</h3>
                {product.description}
            </p>
            <p>
                <h3>Nutrients:</h3>
                {product.nutrients}
            </p>
        </div>
    )
}

export default ProductView;