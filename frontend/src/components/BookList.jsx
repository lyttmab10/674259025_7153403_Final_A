import { BookOpen, Calendar, Eye, Pencil, Trash2 } from "lucide-react";

const getCategoryBadge = (category) => {
  switch (category) {
    case "เทคโนโลยี":
      return (
        <span className="inline-flex items-center rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 border border-sky-200/60">
          เทคโนโลยี
        </span>
      );
    case "วิทยาศาสตร์":
      return (
        <span className="inline-flex items-center rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 border border-purple-200/60">
          วิทยาศาสตร์
        </span>
      );
    case "วรรณกรรม":
      return (
        <span className="inline-flex items-center rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 border border-amber-200/60">
          วรรณกรรม
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200">
          {category}
        </span>
      );
  }
};

const getStatusBadge = (status) => {
  if (status) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200/80">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        เผยแพร่
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
      <span className="size-1.5 rounded-full bg-slate-400" />
      ฉบับร่าง
    </span>
  );
};

const BookList = ({ books, onEdit, onDelete, onViewDetail }) => {
  if (!books || books.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 mb-3">
          <BookOpen className="size-8 text-slate-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">
          ไม่มีข้อมูล / ไม่พบผลการค้นหา
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
          ลองเปลี่ยนคำค้นหา ปรับเปลี่ยนตัวกรอง หรือเพิ่มหนังสือเล่มใหม่เข้าสู่ระบบ
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* List Header & Summary Counter */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-800">
            รายการหนังสือ
          </h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
            {books.length} รายการ
          </span>
        </div>
        <span className="text-xs text-slate-500">
          แสดงข้อมูลเรียงตามรหัส
        </span>
      </div>

      {/* Main Table Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-semibold text-slate-500">
                <th className="py-3.5 px-4 w-14 text-center">ID</th>
                <th className="py-3.5 px-4 min-w-[220px]">ชื่อหนังสือ</th>
                <th className="py-3.5 px-4 min-w-[140px]">ผู้แต่ง</th>
                <th className="py-3.5 px-4">หมวดหมู่</th>
                <th className="py-3.5 px-4 whitespace-nowrap">วันที่เผยแพร่</th>
                <th className="py-3.5 px-4">สถานะ</th>
                <th className="py-3.5 px-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="group hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-400">
                    #{book.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div
                      className="font-medium text-slate-800 max-w-xs truncate sm:max-w-md group-hover:text-blue-600 transition-colors"
                      title={book.title}
                    >
                      {book.title}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {book.author}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getCategoryBadge(book.category)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-slate-400" />
                      {book.publishedDate}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(book.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => onViewDetail && onViewDetail(book)}
                        title="ดูรายละเอียด"
                        aria-label={`ดูรายละเอียด ${book.title}`}
                      >
                        <Eye className="size-3.5" />
                        <span>ดู</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer"
                        onClick={() => onEdit && onEdit(book)}
                        title="แก้ไข"
                        aria-label={`แก้ไขหนังสือ ${book.title}`}
                      >
                        <Pencil className="size-3.5" />
                        <span>แก้</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-2xs hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                        onClick={() => onDelete && onDelete(book)}
                        title="ลบ"
                        aria-label={`ลบหนังสือ ${book.title}`}
                      >
                        <Trash2 className="size-3.5" />
                        <span>ลบ</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookList;
