import { authentication } from './Logical/Authentication';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UpdatePasswordForm() {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [returnUrl, setReturnUrl] = useState('');

    useEffect(() => {
        if (!id) {
            // no id                                                                                                                                                                                                                                                                                                                                                                                                                     
        }

        LoadReturnUrl();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function LoadReturnUrl() {
        const params = new URLSearchParams(window.location.search);
        
        const _returnUrl = params.get('returnUrl');
        if(_returnUrl !== null){
            setReturnUrl(_returnUrl);
        }
    }

    function Save() {
        if (password === "") {
            alert("Password should have a value");
            return;
        }

        if (repassword !== password) {
            alert("Password does not match");
            return;
        }

        let user = {
            id: id,
            password: password
        };

        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`https://localhost:7222/api/users/updatePassWord`,
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
        window.location.href = returnUrl;
    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>
                    Update password of user
                </h1>
                <div class="form-group row">
                    <div class="col-sm-10">
                        {
                            id ?
                                <>
                                    <input
                                        placeholder='New password'
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        maxLength={100} />
                                    <input
                                        placeholder='Repeat password'
                                        type="password"
                                        class="form-control"
                                        name="repassword"
                                        value={repassword}
                                        onChange={e => setRePassword(e.target.value)}
                                        maxLength={100} />
                                </>
                                :
                                <span>
                                    No id User detected
                                </span>
                        }
                    </div>
                </div>
                <div class="form-group row" style={{ marginTop: "10px" }}>
                    <button
                        style={{
                            minWidth: "100px",
                            marginRight: "10px",
                            marginLeft: "10px"
                        }}
                        class="btn btn-primary col col-sm-auto"
                        onClick={Save}>
                        <i class="bi-floppy2"></i>
                        <div>
                            Save
                        </div>
                    </button>
                    {
                        returnUrl !== ""
                        &&
                        <button
                            style={{ minWidth: "80px" }}
                            class="btn btn-secondary col col-md-auto"
                            onClick={Back}>
                            <i class="bi-arrow-left-square"></i>
                            <div>
                                Back
                            </div>
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default UpdatePasswordForm;