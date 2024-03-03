import { useEffect, useState } from "react";

function RecipeProductsView ({recipeId}) {
    const [products, setRecipes] = useState([]);

    function GetProducts(){
        if(!recipeId) return;

        fetch(`https://localhost:7222/api/RecipeProducts/getByRecipe/${recipeId}`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
            })
            .catch((error) => console.log("Something happened getting product: " + error));
    }

    useEffect(() => {
        GetProducts();
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