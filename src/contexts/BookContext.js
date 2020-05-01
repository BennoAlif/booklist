import React, { createContext, useState, useEffect } from "react";
import uuid from "uuid/dist/v1";

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
      fetch('https://web-server-book-dicoding.appspot.com/list')
      .then(res => {
          return res.json()
      })
      .then(res => {
          setBooks(res.books)
      })
  },[])

  const addBook = (title, author) => {
    setBooks([...books, { title, author, id: uuid() }]);
  };

  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };
  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
