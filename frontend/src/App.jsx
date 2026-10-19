import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AddBookPage from "./pages/AddBookPage.jsx";
import EditBookPage from "./pages/EditBookPage.jsx";
import BookPage from "./pages/BookPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/books/new" element={<AddBookPage />} />
        <Route path="/books/:id/edit" element={<EditBookPage />} />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
