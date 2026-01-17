//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication.js';
import netapi from './variables/apiurls.js';

function ImageForm() {
    const { id } = useParams();
    const [more, setMore] = useState('');
    const [imageFile, setImageFile] = useState(null);

    function GetImage(id) {
        fetch(`${netapi}/Images/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setMore(data.more);
            })
            .catch((error) => console.log("Something happened getting image: " + error));
    }

    useEffect(() => {
        if (id) {
            GetImage(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleFileChange(event) {
        const inputElement = event.target;

        const files = inputElement.files;

        if (files && files.length > 0) {
            setImageFile(files[0]);
            console.log(files[0]);
        }
    }

    function Verify() {
        let validationErrors = `${langReference(GetLanguaje()).verify}:`;

        if (more === "") {
            validationErrors += `\n- ${langReference(GetLanguaje()).moreAboutThisImage} ${langReference(GetLanguaje()).isEmpty}`;
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

        let saveType = "save";

        let headers = authentication.GetAuthorizationHeaders();
        const formData = new FormData();

        if (id) {
            saveType = "update";
            formData.append('id', id);
        }

        formData.append('more', more);
        formData.append('userId', (authentication.GetCurrentUserId()).toString());
        formData.append('username', authentication.GetCurrentUserName());
        formData.append('imageFile', imageFile);

        fetch(`${netapi}/Images/${saveType}`,
            {
                method: 'POST',
                headers: headers,
                body: formData
            })
            .then(response => {
                if (response.status === 200)
                    window.location.href = `/images`;
            })
            .catch((error) => console.log("Something happened saving image: " + error));
    }

    function Back() {
        window.location.href = `/images`;
    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>
                    {!id ? langReference(GetLanguaje()).create : langReference(GetLanguaje()).modify} {langReference(GetLanguaje()).image.toLowerCase()}
                </h1>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <label class="col-sm-9 col-form-label">
                            {langReference(GetLanguaje()).moreAboutThisImage}
                        </label>
                        <input
                            class="form-control"
                            name="more"
                            value={more}
                            onChange={e => setMore(e.target.value)}
                            maxLength={100} />
                    </div>
                    <div class="col-sm-10">
                        <label
                            class="btn btn-primary col col-md-auto"
                            for="imageFile">{langReference(GetLanguaje()).chooseAPicture}</label>
                        <input style={{ display: "none" }} type="file" id="imageFile" name="imageFile" accept="image/png, image/jpeg" onChange={handleFileChange} />
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

export default ImageForm;
