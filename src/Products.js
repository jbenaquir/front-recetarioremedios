import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

function Products() {
    const [products, setProducts] = useState([]);
    
    function GetProducts() {
        fetch('https://localhost:7222/api/Products/search',
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data);
        })
        .catch((error)=> console.log("Something happened getting products: " + error));
    }
    //loads when component mounts
    useEffect(() => {
        const fetchData = async ()=>{
            GetProducts();
        }

        fetchData();
    }, []);
    
    function GoToCreate () {
        console.log(`Go To Create`);
        window.location.href = `/products/create`;
    }
    
    function GoToDelete (id) {
        console.log(`Delete Product Id: ${id}`);
    
        //update products
    }

    return (
        <div>
            <div>
                <h1>Products</h1>
                <p>
                    <button onClick={(e) => GoToCreate()}>Create</button>
                    <input placeholder="Search"/>
                </p>
            </div>
            {products.map(product => (
                <div>
                    <a href={`/products/${product.id}/${product.name}`} target="_blank" rel="noreferrer" >Ver {product.name}</a>
                    <a href={`/products/${product.id}/${product.name}/edit`}>Modificar</a>
                    <button onClick={(e) => GoToDelete(product.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    )
}

export default Products;