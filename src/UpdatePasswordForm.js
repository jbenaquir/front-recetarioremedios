import { authentication } from './Logical/Authentication';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UpdatePasswordForm() {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    useEffect(() => {
        if (!id) {
            // no id                                                                                                                                                                                                                                                                                                                                                                                                                     
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function Save() {
        if(repassword !== password)
        {
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

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>
                    Update password of user
                </h1>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            Password
                        </label>
                        {
                            id ?
                                <>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        maxLength={100} />
                                    <input
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
                            "margin-right": "10px", "margin-left": "10px"
                        }}
                        class="btn btn-primary col col-md-auto"
                        onClick={Save}>
                        <i class="bi-floppy2"></i>
                        <div>
                            Save
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdatePasswordForm;