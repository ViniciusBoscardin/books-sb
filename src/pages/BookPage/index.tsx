import { useRouter } from "next/router";
import { Book } from "../../components/SearchInput";
import { GetServerSideProps } from "next";
import Link from "next/link";

export async function getServerSideProps() {
  const data = await fetch(`https://openlibrary.org/search.json?q=`);

  const books = await data.json();

  console.log(books);

  return {
    props: books,
  };
}
