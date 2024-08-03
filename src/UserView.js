import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function ProductView() {
    const { id } = useParams();
    const [user, setProduct] = useState({});

    function GetProduct(id) {
        fetch(`https://localhost:7222/api/Users/${id}`,
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
            <h1>User: </h1>
            <p>
                {user.name}
            </p>
            <h3>Role:</h3>
            <p>
                Id: {user.roleId}
            </p>
            <h3>Update Password:</h3>
            <p>
                Add button for update password
            </p>
        </div>
    )
}

export default ProductView;