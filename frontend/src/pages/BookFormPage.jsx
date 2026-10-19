import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageState from "../components/PageState.jsx";
import BookForm from "../components/BookForm.jsx";
import BookHeader from "../components/BookHeader.jsx";
import { showError, showSuccess } from "../services/alertService.js";
import {
  createBook,
  getBook,
  updateBook,
} from "../services/bookService.js";

const VALID_CATEGORIES = ["เทคโนโลยี", "วิทยาศาสตร์", "วรรณกรรม"];

function BookFormPage({ isEditing = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);

  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const loadBook = async () => {
      try {
        const book = await getBook(id);
        setTitle(book.title || "");
        setAuthor(book.author || "");
        setCategory(book.category || "");
        setPublishedDate(book.publishedDate || "");
        setDescription(book.description || "");
        setStatus(book.status ?? true);
      } catch (requestError) {
        setError(requestError.message);
        showError(requestError);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id, isEditing]);

  const validate = () => {
    if (!title || !title.trim()) {
      showError("กรุณาระบุชื่อหนังสือ");
      return false;
    }
    if (title.trim().length > 150) {
      showError("ชื่อหนังสือต้องมีความยาวไม่เกิน 150 ตัวอักษร");
      return false;
    }

    if (!author || !author.trim()) {
      showError("กรุณาระบุชื่อผู้แต่ง");
      return false;
    }
    if (author.trim().length > 100) {
      showError("ชื่อผู้แต่งต้องมีความยาวไม่เกิน 100 ตัวอักษร");
      return false;
    }

    if (!category || !VALID_CATEGORIES.includes(category)) {
      showError("กรุณาเลือกหมวดหมู่ให้ถูกต้อง (เทคโนโลยี, วิทยาศาสตร์ หรือ วรรณกรรม)");
      return false;
    }

    if (!publishedDate) {
      showError("กรุณาระบุวันที่เผยแพร่");
      return false;
    }

    if (!description || !description.trim()) {
      showError("กรุณาระบุรายละเอียดหนังสือ");
      return false;
    }
    if (description.trim().length > 2000) {
      showError("รายละเอียดหนังสือต้องมีความยาวไม่เกิน 2,000 ตัวอักษร");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const bookData = {
        title: title.trim(),
        author: author.trim(),
        category,
        publishedDate,
        description: description.trim(),
        status,
      };

      if (isEditing) {
        await updateBook(id, bookData);
      } else {
        await createBook(bookData);
      }

      await showSuccess(
        isEditing ? "แก้ไขหนังสือสำเร็จ" : "เพิ่มหนังสือสำเร็จ",
        `หนังสือ "${bookData.title}" ได้รับการบันทึกแล้ว`,
      );
      navigate("/books");
    } catch (requestError) {
      showError(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/70 px-4 py-8 sm:px-6 lg:px-8 text-slate-800">
      <div className="mx-auto max-w-4xl space-y-6">
        <BookHeader />
        <PageState loading={loading} error={error} />
        {!loading && !error && (
          <BookForm
            editingId={isEditing ? id : null}
            title={title}
            author={author}
            category={category}
            publishedDate={publishedDate}
            description={description}
            status={status}
            isSubmitting={isSubmitting}
            onTitleChange={setTitle}
            onAuthorChange={setAuthor}
            onCategoryChange={setCategory}
            onPublishedDateChange={setPublishedDate}
            onDescriptionChange={setDescription}
            onStatusChange={setStatus}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/books")}
          />
        )}
      </div>
    </main>
  );
}

export default BookFormPage;
