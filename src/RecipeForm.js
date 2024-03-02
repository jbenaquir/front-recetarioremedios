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

        if(id){
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
                debugger;
                if(saveType === "save"){
                    id = data.id;//load id
                }
                SaveProducts();
            })
            .catch((error) => console.log("Something happened saving recipe: " + error));
    }

    function SaveProducts(){
        fetch(`https://localhost:7222/api/RecipeProducts/saveForRecipe/${id}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(products)
            })
            .then(response => {
                if(response.status === 200)
                {
                    window.location.href = `/recipes`;
                }
            })
            .catch((error) => console.log("Something happened saving recipe: " + error));
    }
    
    function Back() {
        window.location.href = `/recipes`;
    }

    function receiveProducts(values){
        setProducts(values);
    }

    return (
        <>
            <h1>Create/Edit Recipe</h1>
            <div>
                <label>
                    Name:
                    <br />
                    <input name="name" 
                        value={name} 
                        onChange={ e => setName(e.target.value)} 
                        maxLength={100}/>
                </label>
                <br />
                <label>
                    Description:
                    <br />
                    <input name="description" 
                        value={description} 
                        onChange={ e => setDescription(e.target.value)} 
                        maxLength={100}/>
                </label>
                <br />
                <label>
                    Preparación:
                    <br />
                    <input name="preparation" 
                        value={preparation} 
                        onChange={ e => setPreparation(e.target.value)} 
                        maxLength={100}/>
                </label>
            </div>
            <div>
                <RecipeProductsCheck 
                    recipeId={id}
                    sendProducts={receiveProducts} />
            </div>
            <div>
                <button onClick={Save}>Save</button>
                <button onClick={Back}>Back</button>
            </div>
        </>
    )
}

export default RecipeForm;
