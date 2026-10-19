import { BookOpen, Calendar, CheckCircle2, Clock, FileText, Tag, User, X } from "lucide-react";

const BookDetailModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-book-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl border border-slate-200/80 transition-all text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <BookOpen className="size-5" />
            </div>
            <div>
              <span className="font-mono text-xs font-semibold text-slate-400">
                รหัสหนังสือ #{book.id}
              </span>
              <h3 id="modal-book-title" className="text-lg font-bold text-slate-900 leading-snug">
                {book.title}
              </h3>
            </div>
          </div>
          <button
            className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Author */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <User className="size-4 text-slate-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-slate-400 font-medium">ผู้แต่ง</p>
              <p className="text-sm font-semibold text-slate-800 truncate">{book.author}</p>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <Tag className="size-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">หมวดหมู่</p>
              <span className="inline-block rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-700 border border-slate-200 shadow-2xs mt-0.5">
                {book.category}
              </span>
            </div>
          </div>

          {/* Published Date */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <Calendar className="size-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">วันที่เผยแพร่</p>
              <p className="text-sm font-semibold text-slate-800">{book.publishedDate}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <CheckCircle2 className="size-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium">สถานะ</p>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium mt-0.5 ${
                  book.status
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    book.status ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                />
                {book.status ? "เผยแพร่" : "ฉบับร่าง"}
              </span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-3.5 rounded-xl bg-slate-50 p-4 border border-slate-100">
          <div className="mb-1.5 flex items-center gap-1.5 text-slate-400 text-xs font-medium">
            <FileText className="size-3.5" />
            <span>รายละเอียดหนังสือ</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {book.description}
          </p>
        </div>

        {/* Timestamps */}
        {(book.createdAt || book.updatedAt) && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 px-1">
            <Clock className="size-3.5" />
            <span>
              บันทึกเมื่อ: {new Date(book.createdAt).toLocaleString("th-TH")}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={onClose}
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
