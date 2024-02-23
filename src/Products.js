import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

function Products() {
    return (
        <div>
            <div>
                <h1>Products</h1>
                <p>
                    <Button>Create</Button>
                    <input placeholder="Search"/>
                </p>
            </div>
            <div>
                <a href="/products/{id}/{product_name}" target="_blank" >Ver Producto Product_Name</a>
                <Button href="/products/{id}/{product_name}/modificar/">Modificar</Button>
                <Button href="/products/{id}/{product_name}/eliminar/">Eliminar</Button>
            </div>
        </div>
    )
}

export default Products;