import axios from "axios";

export default {
  getBooks: function () {
    return axios.get(
      "https://www.googleapis.com/books/v1/volumes?&key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0&q=Pokemon"
    );
  },

  addBook: function(dbData) {
    return axios.post('/api/books', dbData);
  }

};
