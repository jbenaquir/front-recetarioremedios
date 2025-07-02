import { useEffect, useState } from "react";
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function RecipeProductsView ({recipeId}) {
    const [products, setRecipes] = useState([]);

    function GetProducts(){
        fetch(`${netapi}/RecipeProducts/getByRecipe/${recipeId}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
            })
            .catch((error) => console.log("Something happened getting product: " + error));
    }

    useEffect(() => {
        if(recipeId){
            GetProducts();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recipeId]);

    function ViewProduct(product){
        window.location.href = `/products/${product.id}/${product.name}`;
    }
    return (
        <>
            <h3>Products:</h3>
            <table>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>
                            {product.name}
                        </td>
                        <td>
                            <button
                                class="btn btn-primary"
                                onClick={() => {ViewProduct(product)}}>Ver</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default RecipeProductsView;