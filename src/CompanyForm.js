import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function CompanyForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [returnUrl, setReturnUrl] = useState('');
    
    useEffect(() => {
        LoadReturnUrl();

        if(!authentication.IsAdmin()){
            window.location.href = `/404`;
        }
        
        if (id) {
            GetCompany(id);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function LoadReturnUrl() {
        const params = new URLSearchParams(window.location.search);

        const _returnUrl = params.get('returnUrl');
        if (_returnUrl !== null) {
            setReturnUrl(_returnUrl);
        }
    }

    function PreventEnterWrongName(e) {
        if (e.key === " ") {
            e.preventDefault();
        }
    }

    function GetCompany(id) {
        console.log("load user id:" + id);

        fetch(`${netapi}/companies/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
            })
            .catch((error) => console.log("Something happened getting user: " + error));
    }

    function Verify() {
        let validationErrors = "Verify:";

        if (name === "") {
            validationErrors += "\n- Fill name value";
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
        
        let company = {
            id: -1,
            name: name
        };

        let saveType = "save";

        if (id) {
            saveType = "update";
            company.id = id;
        }

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`${netapi}/companies/${saveType}`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(company)
            })
            .then(response => {
                if (response.status === 200){
                    if(authentication.authenticated()){
                        window.location.href = `/companies`;
                    } else {
                        window.location.href = returnUrl;
                    }
                }
            })
            .catch((error) => console.log("Something happened saving company: " + error));
    }

    function Back() {
        debugger;
        if(returnUrl != null || returnUrl !== ""){
            window.location.href = returnUrl;
        }
        else {
            window.location.href = "/";
        }

    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>
                    {!id ? "Create" : "Edit"} company account
                    <i class="bi-person"></i>
                </h1>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            * Name
                        </label>
                        <input
                            class="form-control"
                            name="name"
                            value={name}
                            onKeyDown={e => PreventEnterWrongName(e)}
                            onChange={e => setName(e.target.value)}
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
                <div>* Required fields</div>
            </div>
        </div>
    )
}

export default CompanyForm;
