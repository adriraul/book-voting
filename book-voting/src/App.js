import { useEffect, useState } from "react";
import { BookAdd } from "./components/BookAdd";
import { BookList } from "./components/BookList";
import { io } from "socket.io-client";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    })

  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    })
  }, [socket]);

  useEffect(() => {
    socket.on('current-books', (books) => {
      setBooks(books);
    })
  }, [socket]);

  const vote = ( id ) => {
    socket.emit('vote-book', id)
  }

  const deleteBook = (id) => {
    socket.emit('delete-book' , id)
  }

  const changeBookName = (id, newName) => {
    socket.emit('change-book-name' , {id, newName})
  }

  const addBook = (name) => {
    socket.emit('add-book', name);
  }

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>
      <h1>BookNames</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <BookList data={ books } vote={vote} deleteBook = {deleteBook} changeBookName = {changeBookName}/>
        </div>
        <div className="col-4">
          <BookAdd addBook= {addBook} />
        </div>
      </div>
    </div>
  );
}

export default App;
