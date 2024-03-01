import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nutrients, setNutrients] = useState('');

    function GetProduct(id) {
        fetch(`https://localhost:7222/api/Products/${id}`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setNutrients(data.nutrients);
            })
            .catch((error) => console.log("Something happened getting product: " + error));
    }

    useEffect(() => {
        GetProduct(id);
    }, []);

    function Save() {
        let product = {
            name: name,
            description: description,
            nutrients: nutrients,
            image: "",
            imagePath: ""
        };

        let saveType = "save";

        if(id){
            saveType = "update";
            product.id = id;
        }
        debugger;

        fetch(`https://localhost:7222/api/Products/${saveType}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            .then(response => {
                if(response.status === 200)
                    window.location.href = `/products`;
            })
            .catch((error) => console.log("Something happened saving product: " + error));
    }
    
    function Back() {
        window.location.href = `/products`;
    }

    return (
        <>
            <h1>Create/Edit Product</h1>
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
                    Nutrients:
                    <br />
                    <input name="nutrients" 
                        value={nutrients} 
                        onChange={ e => setNutrients(e.target.value)} 
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

export default ProductForm;
