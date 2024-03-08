import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeProductsCheck from './RecipeProductsCheck';

function RecipeForm() {
    let { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [preparation, setPreparation] = useState('');
    const [products, setProducts] = useState([]);

    function GetRecipe(id) {
        fetch(`https://localhost:7222/api/Recipes/${id}`,
            {
                method: 'GET'
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
        GetRecipe(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function Save() {
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

        fetch(`https://localhost:7222/api/Recipes/${saveType}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
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

    function SaveProducts() {
        fetch(`https://localhost:7222/api/RecipeProducts/saveForRecipe/${id}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
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
                <h1 class="text-center">Create/Edit Recipe</h1>
                <div class="form-group row">
                    <div class="col-md-8">
                        <label class="form-label">
                            Name
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
                            Description
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
                            Preparación:
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
                            Save
                        </div>
                    </button>
                    <button
                        style={{ minWidth: "80px" }}
                        class="btn btn-secondary col col-md-auto"
                        onClick={Back}>
                        <i class="bi-arrow-left-square"></i>
                        <div>
                            Back
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeForm;
