import React, { useEffect, useState } from "react";

export const BookList = ({data, vote, deleteBook, changeBookName}) => {
    const [books, setBooks] = useState(data);

    useEffect(() => {
        setBooks(data);
    }, [data])

    const nameChanged = (event, id) =>  {
        const newName = event.target.value;
        setBooks(books => books.map(book => {
            if(book.id === id) {
                book.name = newName;
            }
            return book;
        }))
        console.log(id);
    }

    const onFocusLost = (id, newName) => {
        changeBookName(id, newName);
    }

    const crearRows = () => {
        return(
            books.map(book => (
                <tr key={book.id}>
                <td>
                    <button 
                    className="btn btn-primary"
                    onClick={()=> vote(book.id)}> +1 </button>
                </td>
                <td>
                    <input className="form-control"
                    value = {book.name}
                    onChange={(event) => nameChanged(event, book.id)}
                    onBlur= {() => onFocusLost(book.id, book.name)}
                    ></input>
                </td>
                <td><h3>{book.votes}</h3></td>
                <td><button className="btn btn-danger"
                onClick={()=> deleteBook(book.id)}>Borrar</button></td>
            </tr>
            ))
        )
    }
    return (
        <>
        <table className="table table-stripped">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>

                </tr>
            </thead>
            <tbody>{crearRows()}</tbody>
        </table>
        </>
    )
}