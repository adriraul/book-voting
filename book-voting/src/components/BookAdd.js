import React, { useContext, useState } from "react";
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
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo libro"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
      </form>
    </>
  );
};
