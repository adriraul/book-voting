import React, { useState } from "react";

export const BookAdd = ({addBook}) => {

    const [value, setValue] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        if(value.trim().length > 0) {
            addBook(value);
        }

        setValue('');
        
    }
    return (
        <>
        <h3>Añadir Libro</h3>
        <form onSubmit={onSubmit}>
            <input className="form-control"
            placeholder="Nuevo libro"
            value = {value}
            onChange={(event) => setValue(event.target.value)}>
                
            </input>
        </form>
        </>
    )
}