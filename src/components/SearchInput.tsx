import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { BookList } from "./BookList";

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// interface queryResponse {
//   docs: Book[];
//   numFound: number;
//   numFoundExact: boolean;
// }

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError } = useQuery<Book[]>(
    ["search", searchTerm, currentPage, pageSize],
    () => fetchSearchResults(searchTerm, currentPage, pageSize)
  );

  const fetchSearchResults = async (
    searchTerm: string,
    page: number,
    pageSize: number
  ) => {
    const startIndex = (page - 1) * pageSize;
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${searchTerm}&page=${page}&limit=${pageSize}`
    );
    const data = await response.json();
    return data.docs as Book[];
  };
  // console.log(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold m-5">Biblioteca</h1>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
      </form>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-lg mt-5"></span>
        </div>
      ) : isError ? (
        <div>Error </div>
      ) : (
        <BookList books={data} />
      )}
    </div>
  );
};

export default SearchBar;
