import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [preparation, setPreparation] = useState('');

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
            .then(response => {
                if(response.status === 200)
                    window.location.href = `/recipes`;
            })
            .catch((error) => console.log("Something happened saving recipe: " + error));
    }
    
    function Back() {
        window.location.href = `/recipes`;
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
                <button onClick={Save}>Save</button>
                <button onClick={Back}>Back</button>
            </div>
        </>
    )
}

export default RecipeForm;
