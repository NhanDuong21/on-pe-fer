import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

import HomePage from "./pages/Homepage";
import BooksListPage from "./pages/BooksListPage";
import BookDetailPage from "./pages/BookDetailPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div>
       <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
    </div>
   
  );
}

export default App;
