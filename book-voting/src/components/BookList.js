import React, { useContext, useEffect, useState } from "react";
import { Button, Table, FormControl } from "react-bootstrap";
import { SocketContext } from "../context/SocketContext";

export const BookList = () => {
  const [books, setBooks] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-books", (books) => {
      setBooks(books);
    });

    return () => socket.off("current-books"); // desmontar el useeffect
  }, [socket]);

  const nameChanged = (event, id) => {
    const newName = event.target.value;
    setBooks((books) =>
      books.map((book) => {
        if (book.id === id) {
          book.name = newName;
        }
        return book;
      })
    );
    console.log(id);
  };

  const onFocusLost = (id, newName) => {
    socket.emit("change-book-name", { id, newName });
  };

  const vote = (id) => {
    socket.emit("vote-book", id);
  };

  const deleteBook = (id) => {
    socket.emit("delete-book", id);
  };

  const crearRows = () => {
    return books.map((book) => (
      <tr key={book.id}>
        <td>
          <Button variant="primary" onClick={() => vote(book.id)}>
            +1
          </Button>
        </td>
        <td>
          <FormControl
            value={book.name}
            onChange={(event) => nameChanged(event, book.id)}
            onBlur={() => onFocusLost(book.id, book.name)}
          />
        </td>
        <td>
          <h3>{book.votes}</h3>
        </td>
        <td>
          <Button variant="danger" onClick={() => deleteBook(book.id)}>
            Borrar
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </Table>
    </>
  );
};
