//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

import { useEffect, useState } from 'react';
import { authentication } from './Logical/Authentication.js';
import netapi from './variables/apiurls.js';

function Images() {
    const [images, setImages] = useState([]);
    const [imageSearch, setImageSearch] = useState('');

    useEffect(() => {
        Search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSearch]);

    function GoToCreate() {
        console.log(`Go To ${langReference(GetLanguaje()).create}`);
        window.location.href = `/images/create`;
    }

    function GoToView(image) {
        console.log(`Go To ${langReference(GetLanguaje()).view}`);
        window.location.href = `/images/${image.id}/${image.more}`;
    }

    function GoToModify(image) {
        console.log(`Go To ${langReference(GetLanguaje()).modify}`);
        window.location.href = `/images/${image.id}/${image.more}/edit`;
    }

    function GoToDelete(image) {
        if (!window.confirm(`${langReference(GetLanguaje()).promptDeleteImage}`))
            return;

        fetch(`${netapi}/Images/${image.id}`,
            {
                method: 'DELETE',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => {
                if (response.status === 200)
                    Search();
            })
            .catch((error) => console.log("Something happened deleting image: " + error));
    }

    function OnChangeSearch(e) {
        const searchValue = e.currentTarget.value;
        console.log(searchValue);

        setImageSearch(searchValue);
    }

    function Search() {
        const searchValue = imageSearch;

        fetch(`${netapi}/Images/search/${searchValue}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setImages(data);
            })
            .catch((error) => console.log("Something happened getting images: " + error));
    }

    return (
        <div class="grid">
            <div class="row" style={{ margin: "20px" }}>
                <h1 class="col col-9" style={{ textAlign: "center", padding: "9px" }}>{langReference(GetLanguaje()).images}</h1>
                <div class="col col-3">
                    <button
                        class="btn btn-primary"
                        onClick={() => GoToCreate()}
                        title={langReference(GetLanguaje()).create}
                    >
                        <i class="bi-plus-circle"></i>
                        <div>
                            {langReference(GetLanguaje()).create}
                        </div>
                    </button>
                </div>
                <div class="input-group" style={{ "margin": "20px 0 20px 0" }}>
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi-search"></i>
                    </span>
                    <input
                        class="col col-3 form-control"
                        placeholder={langReference(GetLanguaje()).search}
                        onChange={(e) => OnChangeSearch(e)} />
                </div>
            </div>
            <div>
                <table style={{ margin: "0px auto" }}>
                    <tbody>
                        {images.length === 0 &&
                            <tr>
                                <td colSpan={2}>{langReference(GetLanguaje()).thereAreNOElementsToShow}</td>
                            </tr>}
                        {images.map(image => (
                            <tr key={image.id}>
                                <td style={{ textAlign: "center" }}>
                                    {image.more}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px", minWidth: "62px" }}
                                        class="btn btn-primary"
                                        title={langReference(GetLanguaje()).view}
                                        onClick={() => GoToView(image)}>
                                        <i class="bi-eye"></i>
                                        <div>
                                            {langReference(GetLanguaje()).view}
                                        </div>
                                    </button>
                                    <button
                                        style={{ margin: "5px" }}
                                        class="btn btn-primary"
                                        title={langReference(GetLanguaje()).modify}
                                        onClick={() => GoToModify(image)}>
                                        <i class="bi-pencil"></i>
                                        <div>
                                            {langReference(GetLanguaje()).modify}
                                        </div>
                                    </button>
                                    <button
                                        style={{ margin: "5px" }}
                                        class="btn btn-danger"
                                        title={langReference(GetLanguaje()).delete}
                                        onClick={() => GoToDelete(image)}>
                                        <i class="bi-trash"></i>
                                        <div>
                                            {langReference(GetLanguaje()).delete}
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Images;