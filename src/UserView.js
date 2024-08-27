import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function ProductView() {
    const { id } = useParams();
    const [user, setProduct] = useState({});

    function GoToUpdatePassword() {
        const returnUrl = `/users/${id}/view`;
        window.location.href = `/users/${id}/updatepassword?returnUrl=${returnUrl}`;
    }

    function GetProduct(id) {
        fetch(`https://localhost:7222/api/Users/${id}`,
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
            <h1>User: </h1>
            <p>
                {user.name}
            </p>
            <h3>Role:</h3>
            <p>
                {user.roleName}
            </p>
            <p>
                <button
                    style={{
                        minWidth: "100px",
                        "margin-right": "10px", "margin-left": "10px"
                    }}
                    class="btn btn-primary col col-md-auto"
                    onClick={GoToUpdatePassword}>
                    Update Password
                </button>
            </p>
        </div>
    )
}

export default ProductView;