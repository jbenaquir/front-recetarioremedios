function ProductView() {
    const product = { id: 1, name: "peanuts", description: "Lorem impsum bla bla bla" };

    return (
        <div>
            <h1>{product.name}</h1>
            <div>{product.description}</div>
        </div>
    )
}

export default ProductView;