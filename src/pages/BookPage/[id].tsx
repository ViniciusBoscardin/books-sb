import Link from "next/link";

export default function BookPage() {
  return (
    <>
      <Link href="/">Back</Link>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { query } = context;
//   const { id } = query;

//   const response = await fetch(`https://openlibrary.org/search.json?q=&`);
//   const data = await response.json();

//   return {
//     props: {
//       book: data.docs[0],
//     },
//   };
// };
