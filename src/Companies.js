import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { authentication } from './Logical/Authentication';
import netapi from './variables/apiurls';

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [companySearch, setCompanySearch] = useState('');

    useEffect(() => {
        if(!authentication.IsAdmin()){
            window.location.href = `/404`;
        }

        Search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companySearch]);

    function GetCompanies() {
        fetch(`${netapi}/companies/search`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setCompanies(data);
            })
            .catch((error) => console.log("Something happened getting companies: " + error));
    }

    //loads when component mounts
    useEffect(() => {
        const fetchData = async () => {
            GetCompanies();
        }

        fetchData();
    }, []);

    function GoToCreate() {
        const returnUrl = `/companies`;

        window.location.href = `/companies/create?returnUrl=${returnUrl}`;
    }

    function GoToView(company) {
        window.location.href = `/companies/${company.id}/view`;
    }

    function GoToModify(company) {
        const returnUrl = `/companies`;

        window.location.href = `/companies/${company.id}/edit?returnUrl=${returnUrl}`;
    }

    function GoToDelete(company) {
        if (!window.confirm(`Está a punto de borrar company ${company.name}`))
            return;

        fetch(`${netapi}/companies/${company.id}`,
            {
                method: 'DELETE',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => {
                if (response.status === 200)
                    Search();
            })
            .catch((error) => console.log("Something happened deleting company: " + error));
    }


    function GoToChat(company) {
        if (!window.confirm(`Está a punto de text to company: ${company.name}`))
            return;

        window.location.href = `/chat/chatof${company.name}-${company.id}`;
    }

    function OnChangeSearch(e) {
        const searchValue = e.currentTarget.value;
        console.log(searchValue);

        setCompanySearch(searchValue);
    }

    function Search() {
        const searchValue = companySearch;

        fetch(`${netapi}/companies/search/${searchValue}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setCompanies(data);
            })
            .catch((error) => console.log("Something happened getting companies: " + error));
    }

    return (
        <div class="grid">
            <div class="row" style={{ margin: "20px" }}>
                <h1 class="col col-9" style={{ textAlign: "center", padding: "9px" }}>Companies</h1>
                <div class="col col-3">
                    <button
                        class="btn btn-primary"
                        onClick={() => GoToCreate()}
                        title="Create"
                    >
                        <i class="bi-plus-circle"></i>
                        <div>
                            Create
                        </div>
                    </button>
                </div>
                <div class="input-group" style={{ "margin": "20px 0 20px 0" }}>
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi-search"></i>
                    </span>
                    <input
                        class="col col-3 form-control"
                        placeholder="Search"
                        onChange={(e) => OnChangeSearch(e)} />
                </div>
            </div>
            <div>
                <table style={{ margin: "0px auto" }}>
                    <tbody>
                        {companies.length === 0 &&
                            <tr>
                                <td colSpan={2}>There are no elements to show</td>
                            </tr>}
                        {companies.map(company => (
                            <tr key={company.id}>
                                <td style={{ textAlign: "center" }}>
                                    {company.name}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <>
                                    {
                                        (authentication.IsAdmin())
                                            ?
                                            <>
                                                <button
                                                    style={{ margin: "5px", minWidth: "62px" }}
                                                    class="btn btn-primary"
                                                    title="Ver"
                                                    onClick={() => GoToView(company)}>
                                                    <i class="bi-eye"></i>
                                                    <div>
                                                        Ver
                                                    </div>
                                                </button>
                                                <button
                                                    style={{ margin: "5px" }}
                                                    class="btn btn-primary"
                                                    title="Modificar"
                                                    onClick={() => GoToModify(company)}>
                                                    <i class="bi-pencil"></i>
                                                    <div>Modificar</div>
                                                </button>
                                                <button
                                                    style={{ margin: "5px" }}
                                                    class="btn btn-danger"
                                                    title="Eliminar"
                                                    onClick={() => GoToDelete(company)}>
                                                    <i class="bi-trash"></i>
                                                    <div>
                                                        Eliminar
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
                                        onClick={() => GoToChat(company)}>
                                        <i class="bi-chat"></i>
                                        <div>
                                            Messaje
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

export default Companies;