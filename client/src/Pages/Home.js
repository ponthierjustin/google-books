import React, { useState, useEffect } from "react";
/* import { Input } from '../Components/Form/Form' */
import API from "../utils/API";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [savedBooks, setSavedBooks] = useState();

  useEffect(() => {
    showBooks('Pokemon');
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

  function handleButtonClick(event){
    event.preventDefault();
    console.log("I've BeenClicked");
    API.saveBooks()
    
  }

  return (
    <div>
      <article>
        <h1>Book</h1>
        <form>
          <input onChange={handleInputChange} value={search} name="search"/>
          <button onClick={handleFormSubmit}>Search</button>
        </form>

        {books.map((book) => (
          <li>{book.volumeInfo.title}<button onClick={handleButtonClick}>SAVE</button></li>
          
        ))}
      </article>
    </div>
  );
};

export default Home;
