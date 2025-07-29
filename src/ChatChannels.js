import 'bootstrap/dist/css/bootstrap.css';
//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
    langReference, GetLanguaje
} from "./langs/languajes.js";

import { useEffect, useState } from 'react';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function ChatChannels() {
    const [ChatChannels, setChatChannels] = useState([]);
    const [search, setSearch] = useState('');
    const [companyId, setCompanyId] = useState(0);
    const [companies, setCompanies] = useState([]);

    function GetChatChannels() {
        fetch(`${netapi}/ChatChannels/search/${companyId}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setChatChannels(data);
            })
            .catch((error) => console.log("Something happened getting ChatChannels: " + error));
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

    function Search() {
        const searchValue = search;

        fetch(`${netapi}/ChatChannels/search/${companyId}/${searchValue}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setChatChannels(data);
            })
            .catch((error) => console.log("Something happened getting ChatChannels: " + error));
    }

    //loads when component mounts
    useEffect(() => {
        const fetchData = async () => {
            GetChatChannels();
            GetCompanies();
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        Search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function GoToCreate() {
        window.location.href = `/ChatChannels/create`;
    }

    function ChooseIfOption(companyid) {
        // eslint-disable-next-line 
        if (companyid === companyId)
            return "selected";
        else
            return "";
    }

    function GoToView(chatChannel) {
        console.log(`Go To View`);
        window.location.href = `/ChatChannels/${chatChannel.id}/view`;
    }

    function GoToModify(chatChannel) {
        const returnUrl = `/ChatChannels`;

        window.location.href = `/ChatChannels/${chatChannel.id}/edit?returnUrl=${returnUrl}`;
    }

    function GoToDelete(chatChannel) {
        if (!window.confirm(`Está a punto de borrar chat channel${chatChannel.name}`))
            return;

        console.log(`Delete Product Id: ${chatChannel.id}`);
        fetch(`${netapi}/ChatChannels/${chatChannel.id}`,
            {
                method: 'DELETE',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => {
                if (response.status === 200)
                    Search();
            })
            .catch((error) => console.log("Something happened deleting user: " + error));
    }

    function GoToChat(chatChannel) {
        if (!window.confirm(`Está a punto de text to chatChannel: ${chatChannel.name}`))
            return;

        window.location.href = `/chat/${chatChannel.id}`;
    }

    function OnChangeSearch(e) {
        const searchValue = e.currentTarget.value;
        console.log(searchValue);

        setSearch(searchValue);
    }


    return (
        <div class="grid">
            <div class="row" style={{ margin: "20px" }}>
                <h1 class="col col-9" style={{ textAlign: "center", padding: "9px" }}>
                    Chat&nbsp;{langReference(GetLanguaje()).channel}
                </h1>
                <div class="col col-3">
                    <button
                        class="btn btn-primary"
                        onClick={() => GoToCreate()}
                        title="Create"
                    >
                        <i class="bi-plus-circle"></i>
                        <div>
                            {langReference(GetLanguaje()).channel}
                        </div>
                    </button>
                </div>
                {
                    (!authentication.authenticated()
                        || !authentication.IsAdmin())
                        ?
                        <></>
                        :
                        <div class="col col-3">
                            <div>
                                <label for="clientList">
                                    {langReference(GetLanguaje()).client}
                                    :
                                </label>
                            </div>
                            <select
                                name="companiesList"
                                class="form-control"
                                id="companiesList"
                                value={companyId}
                                onChange={e => setCompanyId(e.target.value)}>
                                <option value="0">{langReference(GetLanguaje()).choose}...</option>
                                {
                                    companies.map(company => (
                                        <option value={company.id} selected={ChooseIfOption(company.id)}>
                                            {company.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                }
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
                        {ChatChannels.length === 0 &&
                            <tr>
                                <td colSpan={2}>
                                    {langReference(GetLanguaje()).save}
                                </td>
                            </tr>}
                        {ChatChannels.map(user => (
                            <tr key={user.id}>
                                <td style={{ textAlign: "center" }}>
                                    {user.name}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <>
                                        {
                                            (authentication.GetCurrentRoleId() == 1)
                                                ?
                                                <>
                                                    <button
                                                        style={{ margin: "5px", minWidth: "62px" }}
                                                        class="btn btn-primary"
                                                        title="Ver"
                                                        onClick={() => GoToView(user)}>
                                                        <i class="bi-eye"></i>
                                                        <div>
                                                            {langReference(GetLanguaje()).view}
                                                        </div>
                                                    </button>
                                                    <button
                                                        style={{ margin: "5px" }}
                                                        class="btn btn-primary"
                                                        title="Modificar"
                                                        onClick={() => GoToModify(user)}>
                                                        <i class="bi-pencil"></i>
                                                        <div>
                                                            {langReference(GetLanguaje()).modify}
                                                        </div>
                                                    </button>
                                                    <button
                                                        style={{ margin: "5px" }}
                                                        class="btn btn-danger"
                                                        title="Eliminar"
                                                        onClick={() => GoToDelete(user)}>
                                                        <i class="bi-trash"></i>
                                                        <div>
                                                            {langReference(GetLanguaje()).delete}
                                                        </div>
                                                    </button>
                                                </>
                                                :
                                                <></>
                                        }
                                    </>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px" }}
                                        class="btn btn-blue"
                                        title="Chat"
                                        onClick={() => GoToChat(user)}>
                                        <i class="bi-chat"></i>
                                        <div>
                                            {langReference(GetLanguaje()).message}

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

export default ChatChannels;