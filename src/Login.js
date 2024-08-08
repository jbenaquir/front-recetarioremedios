import { useState } from 'react';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    //Promises course
    //https://www.codecademy.com/courses/asynchronous-javascript/lessons/promises/exercises/introduction
    
    function Authorize(userToken){
        //load this in cookie (request message required)
        const datefinish = new Date(Date.now() + 500 * 86400);
        console.log(JSON.stringify(userToken));
        console.log(datefinish);
        
        SetTokenCookie(JSON.stringify(userToken), datefinish);
        window.location.href = `/`;
    }

    function SetTokenCookie(token, datefinish){
        const cookie = `token=${token};expires=${datefinish}`;

        document.cookie = cookie;
    }

    function Authenticate (){
        //check fields
        var userToken = {
            name: name,
            password: password
        }

        return fetch(`https://localhost:7222/api/UserTokens/checkPassWord/`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userToken)
            })
            .then((response) => {
                return response.json();
            })
            .then((convertedData) => {
                if(convertedData.message !== ""){
                    alert(convertedData.message);
                }else{
                    Authorize(convertedData.data);
                }
            })
            .catch((error) => console.log("Something happened saving user: " + error));
    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>Login</h1>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            Name
                        </label>
                        <input
                            class="form-control"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={100} />
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <label class="col-sm-2 col-form-label">
                            Password
                        </label>
                        <input
                            class="form-control"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                        onClick={Authenticate}>
                        <i class="bi-rocket"></i>
                        <div>
                            Log In
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;