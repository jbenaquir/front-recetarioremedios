import { useState } from 'react';

function ProductForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const product = { id: 1, name: "peanuts", description: "Lorem impsum bla bla bla" };

    function Save() {
        console.log("Save");
    
        window.location.href = `/products`;
    }
    
    function Back() {
        console.log("Back");
    
        window.location.href = `/products`;
    }
    return (
        <>
            <h1>Create/Edit {name}</h1>
            <div>
                <label>
                    Name:
                    <br />
                    <input name="name" 
                        value={name} 
                        onChange={ e => setName(e.target.value)} 
                        maxLength={100}/>
                </label>
                <br />
                <label>
                    Description:
                    <br />
                    <input name="description" 
                        value={description} 
                        onChange={ e => setDescription(e.target.value)} 
                        maxLength={100}/>
                </label>
            </div>
            <div>
                <button onClick={Save}>Save</button>
                <button onClick={Back}>Back</button>
            </div>
        </>
    )
}

export default ProductForm;
