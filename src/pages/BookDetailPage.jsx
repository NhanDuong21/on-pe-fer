import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading book detail...</p>;
  }

  if (!book || !book.id) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="book-detail-page">
      <div className="detail-wrapper">
        <h1 className="mb-3">{book.title}</h1>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Price:</strong> {book.price}
        </p>

        <img
          src={`/${book.image}`}
          alt={book.title}
          className="img-fluid detail-book-image mb-3"
        />

        <div>
          <Button as={Link} to="/books" variant="secondary">
            Back to Book List
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
