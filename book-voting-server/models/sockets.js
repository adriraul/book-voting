const BookList = require("./book-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.bookList = new BookList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      //emitir al cliente conectado todas las bandas actuales
      socket.emit("current-books", this.bookList.getBooks());
      //votar libro
      socket.on("vote-book", (id) => {
        this.bookList.increaseVotes(id);
        this.io.emit("current-books", this.bookList.getBooks());
      });

      //delete libro
      socket.on("delete-book", (id) => {
        this.bookList.removeBook(id);
        this.io.emit("current-books", this.bookList.getBooks());
      });

      socket.on("change-book-name", ({ id, newName }) => {
        this.bookList.changeBookName(id, newName);
        this.io.emit("current-books", this.bookList.getBooks());
      });

      socket.on("add-book", (name) => {
        this.bookList.addBook(name);
        this.io.emit("current-books", this.bookList.getBooks());
      });
    });
  }
}

module.exports = Sockets;
