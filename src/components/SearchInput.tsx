import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { collectGenerateParams } from "next/dist/build/utils";
import { data } from "autoprefixer";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoading, error, data } = useQuery(["repoData", searchTerm], () =>
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`).then((res) =>
      res.json()
    )
  );

  const handleClick = () => {
    console.log("the button was clicked");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center object-bottom">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-2xl font-bold text-red-500">An error has occurred: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Digite aqui sua busca"
        className="px-4 py-2 text-white-800 border border-gray-300 rounded mb-4"
      />
      {data && data.docs.length > 0 && (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="absolute top-0 right-0 h-full px-4 text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 transition-transform transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      )}
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-slate-500 hover:bg-slate-700 text-white font-bold rounded"
      >
        Buscar
      </button>
      {data && (
        <div className={`mt-4 ${isDropdownOpen ? "block" : "hidden"}`}>
          <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
          <p>{data.description}</p>
          {/* Dados retornados pela API */}
          {data.docs.map((doc) => (
            <div key={doc.key} className="my-2">
              <h1>{doc.title}</h1>
              <strong>{doc.author_name}</strong>
              <strong>{doc.publish_date}</strong>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchInput;
