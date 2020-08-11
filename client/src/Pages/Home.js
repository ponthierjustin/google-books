import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
      author: "{ type: String, required: true }",
      synopsis: "String",
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
      <h1>Book</h1>
      <form>
        <input onChange={handleInputChange} value={search} name="search" />
        <button onClick={handleFormSubmit}>Search</button>
      </form>
      <Table>
        <TableHead>
          <TableRow>
            {books.map((book) => (
              <TableRow key={book}>
                <TableCell component="th" scope="row">
                  {book.volumeInfo.title}
                </TableCell>
                <TableCell align="right">
                  {book.volumeInfo.description}
                </TableCell>
                <TableCell
                  align="right"
                  src={book.volumeInfo.imageLinks.thumbnail}
                ></TableCell>
                <button value={book.volumeInfo.title} onClick={handleButtonClick}>
                  SAVE
                </button>
              </TableRow>
            ))}
          </TableRow>
        </TableHead>
      </Table>
      <h1>Favorite Books</h1>
      {favoriteBooks.map((favoriteBook) => (
        <li>{favoriteBook.title}</li>
      ))}
    </div>
  );
};

export default Home;
