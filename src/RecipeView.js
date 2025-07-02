import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import RecipeProductsView from './RecipeProductsView';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function RecipeView() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});

    function GetRecipe(id) {
        fetch(`${netapi}/Recipes/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
            })
            .catch((error) => console.log("Something happened getting recipe: " + error));
    }

    useEffect(() => {
        GetRecipe(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Food script: </h1>
            <p>
                {recipe.name}
            </p>
            <h3>Descripción:</h3>
            <p>
                {recipe.description}
            </p>
            <h3>Script steps:</h3>
            <p>
                {recipe.preparation}
            </p>
            <div>
                <RecipeProductsView recipeId={recipe.id}/>
            </div>
        </div>
    )
}

export default RecipeView;