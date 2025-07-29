//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function ProductForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nutrients, setNutrients] = useState('');

    function GetProduct(id) {
        fetch(`${netapi}/Products/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
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
        if (id) {
            GetProduct(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function Verify() {
        let validationErrors = `${langReference(GetLanguaje()).verify}:`;

        if (name === "") {
            validationErrors += `\n- ${langReference(GetLanguaje()).name} ${langReference(GetLanguaje()).isEmpty}`;
        }

        if (description === "") {
            validationErrors += `\n- ${langReference(GetLanguaje()).description} ${langReference(GetLanguaje()).isEmpty}`;
        }

        if (validationErrors !== `${langReference(GetLanguaje()).verify}:`) {
            window.alert(validationErrors);
            return false;
        }

        return true;
    }

    function Save() {
        if (!Verify()) {
            return;
        }

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

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`${netapi}/Products/${saveType}`,
            {
                method: 'POST',
                headers: headers,
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
                <h1>
                    {!id ? langReference(GetLanguaje()).create : langReference(GetLanguaje()).modify} {langReference(GetLanguaje()).product.toLowerCase()}
                </h1>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            {langReference(GetLanguaje()).name}
                        </label>
                        <input
                            class="form-control"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={100} />
                    </div>
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            {langReference(GetLanguaje()).description}
                        </label>
                        <textarea
                            class="form-control"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            maxLength={100} />
                    </div>
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            {langReference(GetLanguaje()).nutrients}
                        </label>
                        <textarea
                            class="form-control"
                            name="nutrients"
                            value={nutrients}
                            onChange={e => setNutrients(e.target.value)}
                            maxLength={100} />
                    </div>
                </div>
                <div class="form-group row" style={{ marginTop: "10px" }}>
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

export default ProductForm;
