import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { authentication } from './Logical/Authentication';

function Users() {
    const [users, setUsers] = useState([]);
    const [userSearch, setProductSearch] = useState('');

    function GetUsers() {
        fetch('https://localhost:7222/api/Users/search',
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch((error) => console.log("Something happened getting users: " + error));
    }

    //loads when component mounts
    useEffect(() => {
        const fetchData = async () => {
            GetUsers();
        }

        fetchData();
    }, []);

    useEffect(() => {
        Search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSearch]);

    function GoToCreate() {
        console.log(`Go To Create`);
        window.location.href = `/users/create`;
    }

    function GoToView(user) {
        console.log(`Go To View`);
        window.location.href = `/users/${user.id}/view`;
    }

    function GoToModify(user) {
        const returnUrl = `/users`;

        window.location.href = `/users/${user.id}/edit?returnUrl=${returnUrl}`;
    }

    function GoToDelete(user) {
        if (!window.confirm(`Está a punto de borrar user ${user.name}`))
            return;

        console.log(`Delete Product Id: ${user.id}`);
        fetch(`https://localhost:7222/api/Users/${user.id}`,
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


    function GoToText(user) {
        if (!window.confirm(`Está a punto de text to userName: ${user.name}`))
            return;

        window.location.href = `/chat/`;
    }

    function OnChangeSearch(e) {
        const searchValue = e.currentTarget.value;
        console.log(searchValue);

        setProductSearch(searchValue);
    }

    function Search() {
        const searchValue = userSearch;

        fetch(`https://localhost:7222/api/Users/search/${searchValue}`,
            {
                method: 'GET',
                headers: authentication.GetAuthorizationHeaders()
            })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch((error) => console.log("Something happened getting users: " + error));
    }

    return (
        <div class="grid">
            <div class="row" style={{ margin: "20px" }}>
                <h1 class="col col-9" style={{ textAlign: "center", padding: "9px" }}>Users</h1>
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
                        {users.length === 0 &&
                            <tr>
                                <td colSpan={2}>There are no elements to show</td>
                            </tr>}
                        {users.map(user => (
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
                                                        Ver
                                                    </div>
                                                </button>
                                                <button
                                                    style={{ margin: "5px" }}
                                                    class="btn btn-primary"
                                                    title="Modificar"
                                                    onClick={() => GoToModify(user)}>
                                                    <i class="bi-pencil"></i>
                                                    <div>Modificar</div>
                                                </button>
                                                <button
                                                    style={{ margin: "5px" }}
                                                    class="btn btn-danger"
                                                    title="Eliminar"
                                                    onClick={() => GoToDelete(user)}>
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
                                        title="Eliminar"
                                        onClick={() => GoToText(user)}>
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

export default Users;