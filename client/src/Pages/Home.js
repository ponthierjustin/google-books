import React, { useState, useEffect } from "react";
/* import { Input } from '../Components/Form/Form' */
import API from "../utils/API";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    showBooks();
  }, []);

  function showBooks() {
    API.getBooks()
      .then((response) => {
        setBooks(response.data.items); 
        console.log(response.data.items);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
        <article>
              <h1>Book</h1>
              {books.map(book => (
                  <p>
                  {book.volumeInfo.title}
                </p>
              ))} 
            </article>
    </div>
  );
};

export default Home;
