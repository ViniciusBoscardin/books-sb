import { useRouter } from "next/router";
import { Book } from "./SearchInput";
import Pagination from "./Pagination";

interface BookListProps {
  books: Book[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BookList({
  books,
  currentPage,
  totalPages,
  onPageChange,
}: BookListProps) {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const router = useRouter();

  const handleItemClick = (book: Book) => {
    router.push({
      pathname: `/BookPage/${book.title.replace("/works/", "works-")}`,
      query: {
        title: book.title,
        id: book.key,
        author: book.author_name?.join(", "),
        publishYear: book.first_publish_year,
        publishPlace: book.publish_place?.join(", "),
      },
    });
  };

  return (
    <div className="m-8">
      {books.map((book) => (
        <div
          className="mt-5 p-4 border-solid border-2 border-slate-500 rounded-md hover:border-slate-700 hover:bg-black hover:text-white cursor-pointer text-slate"
          key={book.key}
          onClick={() => handleItemClick(book)}
        >
          <h3>{book.title}</h3>
          <p>{book.author_name?.join(", ")}</p>
        </div>
      ))}
      <div className="join m-8 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
}
