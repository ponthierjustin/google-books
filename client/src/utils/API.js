import axios from "axios";
const BASEURL = 'https://www.googleapis.com/books/v1/volumes?&key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0&q=';

export default {
  getBooks: function (query) {
    return axios.get(BASEURL + query);
  },
  saveBooks: function(dbData) {
    return axios.post("/api/books", dbData);
  },

};
