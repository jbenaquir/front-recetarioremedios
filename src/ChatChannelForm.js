import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function ChatChannelsForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [companyId, setCompanyId] = useState(0);
    const [companies, setCompanies] = useState([]);
    const [returnUrl, setReturnUrl] = useState(null);

    useEffect(() => {
        LoadReturnUrl();

        if (authentication.IsAdmin()) {
            GetCompanies();
        }

        if (id) {
            GetChatChannel(id);
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
    function ChooseIfOption(companyid) {
        if (companyid === companyId)
            return "selected";
        else
            return "";
    }

    function GetCompanies() {
        fetch(`${netapi}/Companies/search`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setCompanies(data);
            })
            .catch((error) => console.log("Something happened getting Companies: " + error));
    }

    function GetChatChannel(id) {
        console.log("load ChatChannel id:" + id);

        fetch(`${netapi}/ChatChannels/getwithid/${id}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setCompanyId(data.companyId);
                setPassword(data.password);
            })
            .catch((error) => console.log("Something happened getting ChatChannel: " + error));
    }

    function Verify() {
        let validationErrors = "Verify:";

        if (name === "") {
            validationErrors += "\n- Fill name value";
        }

        if (password === "") {
            validationErrors += "\n- Enter password";
        }

        if (authentication.IsAdmin()) {
            if (companyId === "-1" || companyId === (-1) || companyId === "") {
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

        let chatChannel = {
            id: "",
            name: name,
            password: password,
            companyId: companyId
        };

        let saveType = "save";

        if (id) {
            saveType = "update";
            chatChannel.id = id;
        }


        let headers = authentication.GetAuthorizationHeaders();
        headers.append("Content-Type", "application/json");

        fetch(`${netapi}/ChatChannels/${saveType}`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(chatChannel)
            })
            .then(response => {
                if (response.status === 200) {
                    if (authentication.authenticated()) {
                        window.location.href = `/ChatChannels`;
                    } else {
                        window.location.href = returnUrl;
                    }
                }
            })
            .catch((error) => console.log("Something happened saving ChatChannel: " + error));
    }

    function Back() {
        if (returnUrl != null) {
            window.location.href = returnUrl;
        }
        else {
            window.location.href = "/chatchannels";
        }

    }

    return (
        <div class="grid">
            <div class="row justify-content-start">
                <h1>
                    {!id ? "Create" : "Edit"} Chat Channel
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
                            Password
                        </label>
                        <input
                            class="form-control"
                            name="password"
                            value={password}
                            onKeyDown={e => PreventEnterWrongName(e)}
                            onChange={e => setPassword(e.target.value)}
                            maxLength={5} />
                    </div>

                    {
                        (authentication.IsAdmin())
                            ?
                            <div class="col col-3">
                                <div>
                                    <label for="companyList">
                                        Company:
                                    </label>
                                </div>
                                <select
                                    name="companiesList"
                                    id="companiesList"
                                    defaultValue={companyId}
                                    onChange={e => setCompanyId(e.target.value)}>
                                    <option value="-1">
                                        Choose...
                                    </option>
                                    {
                                        companies.map(company => (
                                            <option value={company.id} selected={ChooseIfOption(company.id)}>
                                                {company.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            :
                            <></>
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

export default ChatChannelsForm;
