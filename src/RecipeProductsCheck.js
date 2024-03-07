import { useEffect, useState } from "react";

function RecipeProductsCheck ({recipeId, sendProducts}) {
    const [products, setProducts] = useState([]);
    const [recipeProducts, setRecipeProducts] = useState([]);

    function GetProducts(){
        fetch(`https://localhost:7222/api/Products/search`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch((error) => console.log("Something happened getting product: " + error));
    }

    function GetProductsByRecipe(){
        if(!recipeId) return;

        fetch(`https://localhost:7222/api/RecipeProducts/getByRecipe/${recipeId}`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setRecipeProducts(data);
            })
            .catch((error) => console.log("Something happened getting product: " + error));
    }

    function CheckProduct() {
        const products = Array.from(document.querySelectorAll('[name="chkProduct"]:checked')).map(chk => chk.value);
        //return to parent
        sendProducts(products);
    }

    useEffect(() => {
        GetProducts();
        GetProductsByRecipe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recipeId]);

    return (
        <>
            <h3>Products:</h3>
            <table class="form-check">
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                name="chkProduct" 
                                id={`chkProduct${product.id}`} 
                                value={product.id} 
                                defaultChecked={recipeProducts.some(rP => rP.name === product.name)}
                                onChange={()=>CheckProduct()}
                                />
                        </td>
                        <td>
                            <label 
                                class="form-check-label" 
                                htmlFor={`chkProduct${product.id}`}>{product.name}</label>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default RecipeProductsCheck;