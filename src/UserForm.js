import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';

function UserForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [returnUrl, setReturnUrl] = useState('');
    
    useEffect(() => {
        LoadReturnUrl();

        let currentUserId = authentication.GetCurrentUserId();

        let roleId = authentication.GetCurrentRoleId();
        if(roleId === 1){
            GetRoles();
        }
        
        if (currentUserId != id 
            && roleId != 1)
        {
            window.location.href = "/";
        }

        
        if (id) {
            GetUser(id);
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
    
    function PreventEnterWrongEmail(e) {
        if (e.key === " ") {
            e.preventDefault();
        }
    }

    function PreventEnterWrongPhone(e) {
        if (e.key === " ") {
            e.preventDefault();
        }
    }

    function ChooseIfOption(roleid) {
        if (roleid === roleId)
            return "selected";
        else
            return "";
    }

    function GetRoles() {
        fetch(`https://localhost:7222/api/Roles/search`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setRoles(data);
            })
            .catch((error) => console.log("Something happened getting user: " + error));
    }

    function GetUser(id) {
        console.log("load user id:" + id);

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

    function Verify() {
        let validationErrors = "Verify:";

        if (name === "") {
            validationErrors += "\n- Fill name value";
        }

        if (!id && password === "") {
            validationErrors += "\n- Enter password";
        }

        if (!id && password !== repassword) {
            validationErrors += "\n- Password is not equal to repeat password";
        }

        if(authentication.authenticated()){
            if (roleId === "-1" || roleId === (-1) || roleId === "") {
                validationErrors += "\n- Choose role";
            }
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
        
        let user = {
            name: name,
            password: password,
            roleId: roleId,
            email: email,
            phone: phone
        };

        if(!authentication.authenticated()){
            user.roleId = 2;
        }

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
                if (response.status === 200){
                    if(authentication.authenticated()){
                        window.location.href = `/users`;
                    } else {
                        window.location.href = returnUrl;
                    }
                }
            })
            .catch((error) => console.log("Something happened saving user: " + error));
    }

    function Back() {
        if(returnUrl != null){
            window.location.href = returnUrl;
        }
        else {
            window.location.href = "/";
        }

    }

    function GoToUpdatePassword() {
        const returnUrl = `/users/${id}/edit`;
        window.location.href = `/users/${id}/updatepassword?returnUrl=${returnUrl}`;
    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>
                    {!id ? "Create" : "Edit"} user account
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
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            Email
                        </label>
                        <input
                            class="form-control"
                            name="email"
                            value={email}
                            onKeyDown={e => PreventEnterWrongEmail(e)}
                            onChange={e => setEmail(e.target.value)}
                            maxLength={100} />
                    </div>
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            Phone
                        </label>
                        <input
                            class="form-control"
                            name="phone"
                            value={phone}
                            onKeyDown={e => PreventEnterWrongPhone(e)}
                            onChange={e => setPhone(e.target.value)}
                            maxLength={100} />
                    </div>
                                        
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            * Password
                        </label>
                        {
                            (id)
                                ?
                                <button
                                    style={{
                                        minWidth: "100px",
                                        "margin-right": "10px", "margin-left": "10px"
                                    }}
                                    class="btn btn-primary col col-md-auto"
                                    onClick={GoToUpdatePassword}>
                                    <i class="bi-lock"></i>
                                    Update Password
                                </button>
                                :
                                <>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        maxLength={100} />
                                    <input
                                        placeholder="Repeat password"
                                        type="password"
                                        class="form-control"
                                        name="repassword"
                                        onChange={e => setRePassword(e.target.value)}
                                        maxLength={100} />
                                </>
                        }
                    </div>
                    {
                        (!authentication.authenticated()
                        || authentication.GetCurrentRoleId() !== 1)
                            ?
                            <></>
                            :
                            <div class="col-sm-10">
                                <label class="col-sm-2 col-form-label">
                                    Role 
                                </label>
                                <select
                                    name="roleId"
                                    class="form-control"
                                    onChange={e => setRoleId(e.target.value)}
                                    defaultValue="-1"
                                >
                                    <option value="-1">
                                        Choose...
                                    </option>
                                    {
                                        roles.map(role => (
                                            <option value={role.id} selected={ChooseIfOption(role.id)}>
                                                {role.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                    }
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

export default UserForm;
