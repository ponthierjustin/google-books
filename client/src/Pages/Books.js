import React, { useState, useEffect } from "react";
import API from "../utils/API";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    showBooks();
  }, []);

  function showBooks() {
    API.getBooks()
      .then((response) => {
        setBooks(response.data.items[0].volumeInfo); 
        console.log(response.data.items[0])
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
        <article>
              <h1>Book</h1>
              <p>
                {books.title}
              </p>
            </article>
    </div>
  );
};

export default Books;
