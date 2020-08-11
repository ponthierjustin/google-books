import React, { useState, useEffect } from "react";
/* import { Input } from '../Components/Form/Form' */
import API from "../utils/API";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    showBooks("Pokemon");
    showFavoriteBooks();
  }, []);

  function showBooks(search) {
    API.getBooks(search)
      .then((response) => {
        setBooks(response.data.items);
        console.log(response.data.items);
      })
      .catch((err) => console.log(err));
  }
  function handleInputChange(event) {
    const { value } = event.target;
    setSearch(value);
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(search);
    showBooks(search);
  }

  function handleButtonClick(event) {
    event.preventDefault();
    console.log(event.target.value);
     const { value } = event.target;
     API.saveBooks({
      title: value,
      author: '{ type: String, required: true }',
      synopsis: 'String',
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err)); 
  }

  function showFavoriteBooks() {
    API.favoriteBooks()
      .then((response) => {
        setFavoriteBooks(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err)); 
  }

  return (
    <div>
      <article>
        <h1>Book</h1>
        <form>
          <input onChange={handleInputChange} value={search} name="search" />
          <button onClick={handleFormSubmit}>Search</button>
        </form>

        {books.map((book) => (
          <li>
            <img alt={book.volumeInfo.title} src={book.volumeInfo.imageLinks.thumbnail}></img>
            {book.volumeInfo.title}
            <p>{book.volumeInfo.description}</p>
            <button
              value={book.volumeInfo.title}   onClick={handleButtonClick}
            >
              SAVE
            </button>
          </li>
        ))}
      </article>
      <h1>Favorite Books</h1>
      {favoriteBooks.map((favoriteBook) => (
          <li>
            {favoriteBook.title}
           {/*  <button
               value={book.selfLink}  onClick={handleButtonClick}
            >
              SAVE
            </button> */}
          </li>
        ))}
    </div>
  );
};

export default Home;
