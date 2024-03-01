import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [recipeSearch, setRecipeSearch] = useState('');

    function GetRecipes() {
        fetch('https://localhost:7222/api/Recipes/search',
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
            })
            .catch((error) => console.log("Something happened getting recipes: " + error));
    }

    //loads when component mounts
    useEffect(() => {
        const fetchData = async () => {
            GetRecipes();
        }

        fetchData();
    }, []);

    useEffect(() => {
        Search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeSearch]);

    function GoToCreate() {
        console.log(`Go To Create`);
        window.location.href = `/recipes/create`;
    }

    function GoToView(recipe) {
        console.log(`Go To View`);
        window.location.href = `/recipes/${recipe.id}/${recipe.name}`;
    }

    function GoToModify(recipe) {
        console.log(`Go To Modify`);
        window.location.href = `/recipes/${recipe.id}/${recipe.name}/edit`;
    }

    function GoToDelete(recipe) {
        if (!window.confirm(`Está a punto de borrar el recipeo ${recipe.name}`))
            return;

        console.log(`Delete Recipe Id: ${recipe.id}`);
        fetch(`https://localhost:7222/api/Recipes/${recipe.id}`,
            {
                method: 'DELETE'
            })
            .then(response => {
                if (response.status === 200)
                    Search();
            })
            .catch((error) => console.log("Something happened deleting recipe: " + error));
    }

    function OnChangeSearch(e) {
        const searchValue = e.currentTarget.value;
        console.log(searchValue);

        setRecipeSearch(searchValue);
    }

    function Search() {
        const searchValue = recipeSearch;

        fetch(`https://localhost:7222/api/Recipes/search/${searchValue}`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
            })
            .catch((error) => console.log("Something happened getting recipes: " + error));
    }

    return (
        <div>
            <div>
                <h1>Recipes</h1>
                <p>
                    <button onClick={() => GoToCreate()}>Create</button>
                    <input placeholder="Search" onChange={(e) => OnChangeSearch(e)} />
                </p>
            </div>

            <table>
                <tbody>
                    {recipes.map(recipe => (
                        <tr key={recipe.id}>
                            <td>
                                {recipe.name}
                            </td>
                            <td>
                                <button onClick={() => GoToView(recipe)}>Ver</button>
                                <button onClick={() => GoToModify(recipe)}>Modificar</button>
                                <button onClick={() => GoToDelete(recipe)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recipes;