import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

function Products() {
    return (
        <div>
            <h1>Products</h1>
            <p>
                <Button>Create</Button>
                <input placeholder="Search"/>
            </p>
        </div>
    )
}

export default Products;