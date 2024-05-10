import React, { useContext, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { SocketContext } from "../context/SocketContext";

export const BookAdd = () => {
  const [value, setValue] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (event) => {
    event.preventDefault();
    if (value.trim().length > 0) {
      socket.emit("add-book", value);
    }
    setValue("");
  };

  return (
    <>
      <h3>Añadir Libro</h3>
      <Form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Nuevo libro"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button type="submit" variant="primary">
            Añadir
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};
