import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Plus, RotateCcw, Search, Filter } from "lucide-react";
import BookHeader from "../components/BookHeader.jsx";
import BookList from "../components/BookList.jsx";
import BookDetailModal from "../components/BookDetailModal.jsx";
import PageState from "../components/PageState.jsx";
import { getBooks, deleteBook } from "../services/bookService.js";
import { confirmDelete, showError, showSuccess } from "../services/alertService.js";

const CATEGORIES = ["เทคโนโลยี", "วิทยาศาสตร์", "วรรณกรรม"];

const BookPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Selected book for Detail Modal
  const [detailBook, setDetailBook] = useState(null);

  useEffect(() => {
    let ignore = false;
    getBooks({ q: searchQuery, category: selectedCategory })
      .then((data) => {
        if (!ignore) {
          setBooks(data);
          setError("");
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || "ไม่สามารถดึงข้อมูลหนังสือได้");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [searchQuery, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getBooks({ q: searchQuery, category: selectedCategory })
      .then((data) => {
        setBooks(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "ไม่สามารถดึงข้อมูลหนังสือได้");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setLoading(true);
  };

  const handleDelete = async (book) => {
    const isConfirmed = await confirmDelete(book.title);
    if (!isConfirmed) return;

    try {
      await deleteBook(book.id);
      setBooks((prev) => prev.filter((item) => item.id !== book.id));
      showSuccess("ลบหนังสือสำเร็จ", `หนังสือ "${book.title}" ถูกลบออกจากระบบแล้ว`);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/70 px-4 py-8 sm:px-6 lg:px-8 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <BookHeader />

        {/* Search & Filter Toolbar */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-3.5"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {/* Search & Dropdown Section */}
              <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="ค้นหาชื่อหนังสือ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Dropdown */}
                <div className="relative sm:w-52">
                  <Filter className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <select
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-8 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">ทุกหมวดหมู่</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset Filters */}
                {(searchQuery || selectedCategory) && (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
                    onClick={handleClearFilters}
                  >
                    <RotateCcw className="size-3.5 text-slate-400" />
                    <span>ล้างเงื่อนไข</span>
                  </button>
                )}
              </div>

              {/* Add New Book Button */}
              <div className="shrink-0">
                <Link
                  to="/books/new"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 active:bg-blue-800 transition-all sm:w-auto"
                >
                  <Plus className="size-4" />
                  <span>เพิ่มหนังสือใหม่</span>
                </Link>
              </div>
            </div>

            {/* Quick Filter Category Chips */}
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
              <span className="text-xs font-medium text-slate-400 mr-1">
                หมวดหมู่ด่วน:
              </span>
              <button
                type="button"
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === ""
                    ? "bg-slate-900 text-white font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                }`}
                onClick={() => setSelectedCategory("")}
              >
                ทั้งหมด
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Loading and Error Feedback */}
        <PageState loading={loading} error={error} />

        {/* Books Table */}
        {!loading && (
          <BookList
            books={books}
            onEdit={(book) => navigate(`/books/${book.id}/edit`)}
            onDelete={handleDelete}
            onViewDetail={(book) => setDetailBook(book)}
          />
        )}

        {/* Book Details Modal */}
        <BookDetailModal
          book={detailBook}
          onClose={() => setDetailBook(null)}
        />
      </div>
    </main>
  );
};

export default BookPage;
