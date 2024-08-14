import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function ProductForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');

    function PreventEnterWrongUserNames (e) {
        if(e.key === " ")
            e.preventDefault();
    }

    function ChooseIfOption(roleid) {
        if (roleid === roleId)
            return "selected";
        else
            return "";
    }

    function GetUser(id) {
        fetch(`https://localhost:7222/api/Users/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setRoleId(data.roleId);
            })
            .catch((error) => console.log("Something happened getting user: " + error));
    }

    useEffect(() => {
        if (id) {
            GetUser(id);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function Save() {
        let user = {
            name: name,
            password: password,
            roleId: roleId
        };

        let saveType = "save";

        if (id) {
            saveType = "update";
            user.id = id;
        }

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`https://localhost:7222/api/Users/${saveType}`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(user)
            })
            .then(response => {
                if (response.status === 200)
                    window.location.href = `/users`;
            })
            .catch((error) => console.log("Something happened saving user: " + error));
    }

    function Back() {
        window.location.href = `/users`;
    }

    function GoToUpdatePassword() {
        window.location.href = `/users/${id}/updatepassword`;
    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>
                    {!id ? "Create" : "Edit"} user
                </h1>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            Name
                        </label>
                        <input
                            class="form-control"
                            name="name"
                            value={name}
                            onKeyDown={e => PreventEnterWrongUserNames(e)}
                            onChange={e => setName(e.target.value)}
                            maxLength={100} />
                    </div>
                    <div class="col-sm-10">
                        {
                            (id)
                                ?
                                <span style={
                                    {"color":"red"}
                                }>
                                     <button
                                        style={{
                                            minWidth: "100px",
                                            "margin-right": "10px", "margin-left": "10px"
                                        }}
                                        class="btn btn-primary col col-md-auto"
                                        onClick={GoToUpdatePassword}>
                                            Update Password
                                    </button>
                                </span>
                                :
                                <>
                                    <label class="col-sm-2 col-form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        maxLength={100} />
                                </>
                        }
                    </div>
                    <div class="col-sm-10">
                        <span style={
                            {"color":"red"}
                        }>CODE: Load roles from api and autochoose when edit<br/></span>
                        <label class="col-sm-2 col-form-label">
                            Role
                        </label>
                        <select
                            name="roleId"
                            class="form-control"
                            onChange={e => setRoleId(e.target.value)}
                        >
                            <option>
                                Choose...
                            </option>
                            <option value="1" selected={ChooseIfOption(1)}>
                                Admin
                            </option>
                        </select>
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
            </div>
        </div>
    )
}

export default ProductForm;
