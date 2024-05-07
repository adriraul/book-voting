const Book = require("./book");

class BookList {
  constructor() {
    this.books = [
      new Book("Marco Aurelio"),
      new Book("Seneca"),
      new Book("Napoleon Hill"),
    ];
  }

  addBook(name) {
    const newBook = new Book(name);
    this.books.push(newBook);
    return this.books;
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  icreaseVotes(id) {
    this.book = this.books.map((book) => {
      if (book.id === id) {
        book.votes += 1;
        return book;
      }
    });
  }

  changeBookName(id, newName) {
    this.book = this.books.map((book) => {
      if (book.id === id) {
        book.name = newName;
        return book;
      }
    });
  }
}

module.exports = BookList;
