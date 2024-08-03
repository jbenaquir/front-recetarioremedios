import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

function Products() {
    const [products, setProducts] = useState([]);
    const [productSearch, setProductSearch] = useState('');

    function GetProducts() {
        fetch('https://localhost:7222/api/Products/search',
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch((error) => console.log("Something happened getting products: " + error));
    }

    //loads when component mounts
    useEffect(() => {
        const fetchData = async () => {
            GetProducts();
        }

        fetchData();
    }, []);

    useEffect(() => {
        Search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productSearch]);

    function GoToCreate() {
        console.log(`Go To Create`);
        window.location.href = `/products/create`;
    }

    function GoToView(product) {
        console.log(`Go To View`);
        window.location.href = `/products/${product.id}/${product.name}`;
    }

    function GoToModify(product) {
        console.log(`Go To Modify`);
        window.location.href = `/products/${product.id}/${product.name}/edit`;
    }

    function GoToDelete(product) {
        if (!window.confirm(`Está a punto de borrar el producto ${product.name}`))
            return;

        console.log(`Delete Product Id: ${product.id}`);
        fetch(`https://localhost:7222/api/Products/${product.id}`,
            {
                method: 'DELETE'
            })
            .then(response => {
                if (response.status === 200)
                    Search();
            })
            .catch((error) => console.log("Something happened deleting product: " + error));
    }

    function OnChangeSearch(e) {
        const searchValue = e.currentTarget.value;
        console.log(searchValue);

        setProductSearch(searchValue);
    }

    function Search() {
        const searchValue = productSearch;

        fetch(`https://localhost:7222/api/Products/search/${searchValue}`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch((error) => console.log("Something happened getting products: " + error));
    }

    return (
        <div class="grid">
            <div class="row" style={{ margin: "20px" }}>
                <h1 class="col col-9" style={{ textAlign: "center", padding: "9px" }}>Products</h1>
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
                        {products.length === 0 &&
                        <tr>
                            <td colSpan={2}>There are no elements to show</td>
                        </tr>}
                        {products.map(product => (
                            <tr key={product.id}>
                                <td style={{ textAlign: "center" }}>
                                    {product.name}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{ margin: "5px", minWidth: "62px" }}
                                        class="btn btn-primary"
                                        title="Ver"
                                        onClick={() => GoToView(product)}>
                                        <i class="bi-eye"></i>
                                        <div>
                                            Ver
                                        </div>
                                    </button>
                                    <button
                                        style={{ margin: "5px" }}
                                        class="btn btn-primary"
                                        title="Modificar"
                                        onClick={() => GoToModify(product)}>
                                        <i class="bi-pencil"></i>
                                        <div>Modificar</div></button>
                                    <button
                                        style={{ margin: "5px" }}
                                        class="btn btn-danger"
                                        title="Eliminar"
                                        onClick={() => GoToDelete(product)}>
                                        <i class="bi-trash"></i>
                                        <div>
                                            Eliminar
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

export default Products;