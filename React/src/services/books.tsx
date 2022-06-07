import axios from "axios";

export interface BookResponse {}

export const getBooks = (title?: string) => {
  let url = `http://${process.env.baseURL}/api/books`;

  if (title) {
    url += `?title=${title}`;
  }

  return axios.get<any>(url);
};

export const addBook = (title: string, author: string, price: number) => {
  const url = `http://${process.env.baseURL}/api/books`;

  const body = {
    title,
    author,
    price,
  };

  return axios.post(url, body);
};
