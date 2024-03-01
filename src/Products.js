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
    
    function GoToCreate () {
        console.log(`Go To Create`);
        window.location.href = `/products/create`;
    }

    function GoToView (product) {
        console.log(`Go To View`);
        window.location.href = `/products/${product.id}/${product.name}`;
    }

    function GoToModify (product) {
        console.log(`Go To Modify`);
        window.location.href = `/products/${product.id}/${product.name}/edit`;
    }
    
    function GoToDelete (product) {
        if(!window.confirm(`Está a punto de borrar el producto ${product.name}`))
            return;

        console.log(`Delete Product Id: ${product.id}`);
        fetch(`https://localhost:7222/api/Products/${product.id}`,
        {
            method: 'DELETE'
        })
        .then(response => {
            if(response.status === 200)
                Search();
        })
        .catch((error)=> console.log("Something happened deleting product: " + error));
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
        .catch((error)=> console.log("Something happened getting products: " + error));
    }

    return (
        <>
            <div>
                <h1>Products</h1>
                <p>
                    <button onClick={(e) => GoToCreate()}>Create</button>
                    <input placeholder="Search" onChange={(e) => OnChangeSearch(e)}/>
                </p>
            </div>
            <table>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>
                            {product.name}
                        </td>
                        <td>
                            <button onClick={() => GoToView(product)}>Ver</button>
                            <button onClick={() => GoToModify(product)}>Modificar</button>
                            <button onClick={() => GoToDelete(product)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default Products;