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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        if (id) {
            saveType = "update";
            product.id = id;
        }

        fetch(`https://localhost:7222/api/Products/${saveType}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            .then(response => {
                if (response.status === 200)
                    window.location.href = `/products`;
            })
            .catch((error) => console.log("Something happened saving product: " + error));
    }

    function Back() {
        window.location.href = `/products`;
    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>Create/Edit Product</h1>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">
                        Name:
                    </label>
                    <div class="col-sm-10">
                        <input
                            class="form-control"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={100} />
                    </div>
                    <label class="col-sm-2 col-form-label">
                        Description:
                    </label>
                    <div class="col-sm-10">

                        <input
                            class="form-control"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            maxLength={100} />
                    </div>
                    <label class="col-sm-2 col-form-label">
                        Nutrients:
                    </label>
                    <div class="col-sm-10">
                        <input
                            class="form-control"
                            name="nutrients"
                            value={nutrients}
                            onChange={e => setNutrients(e.target.value)}
                            maxLength={100} />
                    </div>
                </div>
                <div class="form-group row">
                    <button
                        style={{"margin-right": "10px", "margin-left": "10px"}} 
                        class="btn btn-primary col col-md-auto"
                        onClick={Save}>Save</button>
                    <button
                        class="btn btn-secondary col col-md-auto"
                        onClick={Back}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default ProductForm;
