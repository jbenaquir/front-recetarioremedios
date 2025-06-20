import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { authentication } from './Logical/Authentication';

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [recipeSearch, setRecipeSearch] = useState('');

    function GetRecipes() {
        fetch('https://bnetremedios.azurewebsites.net/api/Recipes/search',
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
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
        fetch(`https://bnetremedios.azurewebsites.net/api/Recipes/${recipe.id}`,
            {
                method: 'DELETE',
                headers: authentication.GetAuthorizationHeaders()
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

        fetch(`https://bnetremedios.azurewebsites.net/api/Recipes/search/${searchValue}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
            })
            .catch((error) => console.log("Something happened getting recipes: " + error));
    }

    return (
        <div class="grid">
            <div class="row" style={{ margin: "20px" }}>
                <h1 class="col col-9" style={{ textAlign: "center", padding: "9px" }}>Recipes</h1>
                <div class="col col-3">
                    <button
                        class="btn btn-primary"
                        onClick={() => GoToCreate()}
                        title="Create"
                    >
                        <i class="bi-plus-circle"></i>
                        <div>
                            Create
                        </div>
                    </button>
                </div>
                <div class="input-group" style={{ "margin": "20px 0 20px 0" }}>
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi-search"></i>
                    </span>
                    <input
                        class="col col-3 form-control"
                        placeholder="Search"
                        onChange={(e) => OnChangeSearch(e)} />
                </div>
            </div>
            <div>
                <table style={{ margin: "0px auto" }}>
                    <tbody>
                        {recipes.length === 0 &&
                            <tr>
                                <td colSpan={2}>There are no elements to show</td>
                            </tr>
                        }
                        {recipes.map(recipe => (
                            <tr key={recipe.id}>
                                <td style={{ textAlign: "center" }}>
                                    {recipe.name}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px", minWidth: "62px" }}
                                        class="btn btn-primary"
                                        title="Ver"
                                        onClick={() => GoToView(recipe)}>
                                        <i class="bi-eye"></i>
                                        <div>
                                            Ver
                                        </div>
                                    </button>
                                    <button
                                        style={{ margin: "5px" }}
                                        class="btn btn-primary"
                                        title="Modificar"
                                        onClick={() => GoToModify(recipe)}>
                                        <i class="bi-pencil"></i>
                                        <div>Modificar</div>
                                    </button>
                                    <button
                                        style={{ margin: "5px" }}
                                        class="btn btn-danger"
                                        title="Eliminar"
                                        onClick={() => GoToDelete(recipe)}>
                                        <i class="bi-trash"></i>
                                        <div>
                                            Eliminar
                                        </div></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Recipes;