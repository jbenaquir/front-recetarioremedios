//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeProductsCheck from './RecipeProductsCheck';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function RecipeForm() {
    let { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [preparation, setPreparation] = useState('');
    const [products, setProducts] = useState([]);

    function GetRecipe(id) {
        fetch(`${netapi}/Recipes/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setPreparation(data.preparation);
            })
            .catch((error) => console.log("Something happened getting recipe: " + error));
    }

    useEffect(() => {
        if(id){
            GetRecipe(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    function Verify() {
        let validationErrors = "Verify:";

        if (name === "") {
            validationErrors += `\n- ${langReference(GetLanguaje()).name} ${langReference(GetLanguaje()).isEmpty}`;
        }

        if (description === "") {
            validationErrors += `\n- ${langReference(GetLanguaje()).description}  ${langReference(GetLanguaje()).isEmpty}`;
        }

        if (validationErrors !== "Verify:") {
            window.alert(validationErrors);
            return false;
        }

        return true;
    }

    function Save() {
        if (!Verify()) {
            return;
        }

        let recipe = {
            name: name,
            description: description,
            preparation: preparation,
            image: "",
            imagePath: "",
            products: []
        };

        let saveType = "save";

        if (id) {
            saveType = "update";
            recipe.id = id;
        }

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`${netapi}/Recipes/${saveType}`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(recipe)
            })
            .then(response => response.json())
            .then(data => {
                if (saveType === "save") {
                    id = data.id;//load id
                }
                SaveProducts();
            })
            .catch((error) => console.log("Something happened saving recipe: " + error));
    }

    let headers = authentication.GetAuthorizationHeaders();
    headers.append("Content-Type", "application/json");

    function SaveProducts() {
        fetch(`${netapi}/RecipeProducts/saveForRecipe/${id}`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(products)
            })
            .then(response => {
                if (response.status === 200) {
                    window.location.href = `/recipes`;
                }
            })
            .catch((error) => console.log("Something happened saving recipe: " + error));
    }

    function Back() {
        window.location.href = `/recipes`;
    }

    function receiveProducts(values) {
        setProducts(values);
    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1 class="text-center">
                    { !id ? langReference(GetLanguaje()).create:langReference(GetLanguaje()).edit } {langReference(GetLanguaje()).recipe}
                </h1>
                <div class="form-group row">
                    <div class="col-md-8">
                        <label class="form-label">
                            {langReference(GetLanguaje()).name}
                        </label>
                        <input
                            class="form-control"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={100} />
                    </div>
                    <div class="col-md-8">
                        <label class="form-label">
                            {langReference(GetLanguaje()).description}
                        </label>
                        <input
                            class="form-control"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            maxLength={100} />
                    </div>
                    <div class="col-md-8">
                        <label class="col-sm-2 col-form-label">
                            {langReference(GetLanguaje()).preparation}
                        </label>
                        <textarea
                            class="form-control"
                            name="preparation"
                            value={preparation}
                            onChange={e => setPreparation(e.target.value)}
                            maxLength={100} />
                    </div>
                </div>
                <div class="form-group row" style={{ "padding": "25px" }}>
                    <RecipeProductsCheck
                        style={{ margin: "0px auto", border: "solid 1px #000" }}
                        recipeId={id}
                        sendProducts={receiveProducts} />
                </div>
                <div class="form-group row">
                    <button
                        style={{
                            minWidth: "100px",
                            "margin-right": "10px", "margin-left": "10px"
                        }}
                        class="btn btn-primary col col-md-auto"
                        onClick={Save}>
                        <i class="bi-floppy2"></i>
                        <div>
                            {langReference(GetLanguaje()).save}
                        </div>
                    </button>
                    <button
                        style={{ minWidth: "80px" }}
                        class="btn btn-secondary col col-md-auto"
                        onClick={Back}>
                        <i class="bi-arrow-left-square"></i>
                        <div>
                            {langReference(GetLanguaje()).back}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeForm;
