import { BookOpen, Calendar, CheckCircle2, FileText, Pencil, PlusCircle, Tag, User, X } from "lucide-react";

const CATEGORIES = ["เทคโนโลยี", "วิทยาศาสตร์", "วรรณกรรม"];

function BookForm({
  editingId,
  title,
  author,
  category,
  publishedDate,
  description,
  status,
  isSubmitting,
  onTitleChange,
  onAuthorChange,
  onCategoryChange,
  onPublishedDateChange,
  onDescriptionChange,
  onStatusChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs text-slate-800">
      {/* Title & Description */}
      <div className="mb-6 flex items-center gap-3.5 border-b border-slate-100 pb-5">
        <div className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs">
          {editingId ? (
            <Pencil className="size-5" />
          ) : (
            <PlusCircle className="size-5" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {editingId ? "แก้ไขข้อมูลหนังสือ" : "เพิ่มหนังสือใหม่"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {editingId
              ? `กำลังแก้ไขรายละเอียดของหนังสือรหัส #${editingId}`
              : "กรอกข้อมูลด้านล่างให้ครบถ้วนเพื่อบันทึกลงสู่ระบบ"}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="size-3.5 text-blue-600" />
                ชื่อหนังสือ <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                1–150 ตัวอักษร ({title ? title.length : 0}/150)
              </span>
            </div>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="เช่น Clean Code หรือ ทฤษฎีสัมพัทธภาพเบื้องต้น"
              maxLength={150}
              required
            />
          </div>

          {/* Author */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="size-3.5 text-blue-600" />
                ชื่อผู้แต่ง <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                1–100 ตัวอักษร ({author ? author.length : 0}/100)
              </span>
            </div>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all"
              value={author}
              onChange={(e) => onAuthorChange(e.target.value)}
              placeholder="เช่น Robert C. Martin"
              maxLength={100}
              required
            />
          </div>

          {/* Category */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Tag className="size-3.5 text-blue-600" />
                หมวดหมู่ <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                เลือกจาก 3 หมวด
              </span>
            </div>
            <select
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              required
            >
              <option value="" disabled>
                -- กรุณาเลือกหมวดหมู่ --
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Published Date */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Calendar className="size-3.5 text-blue-600" />
                วันที่เผยแพร่ <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                วัน/เดือน/ปี
              </span>
            </div>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all"
              value={publishedDate}
              onChange={(e) => onPublishedDateChange(e.target.value)}
              required
            />
          </div>

          {/* Status (Toggle / Radio) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-blue-600" />
                สถานะการเผยแพร่ <span className="text-rose-500">*</span>
              </label>
            </div>
            <div className="flex items-center gap-3 pt-0.5">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-medium border transition-all cursor-pointer ${
                  status === true
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs"
                    : "bg-slate-50/60 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
                onClick={() => onStatusChange(true)}
              >
                <span className={`size-2 rounded-full ${status === true ? "bg-emerald-500" : "bg-slate-300"}`} />
                <span>เผยแพร่ (Publish)</span>
              </button>
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-medium border transition-all cursor-pointer ${
                  status === false
                    ? "bg-slate-100 border-slate-300 text-slate-800 shadow-2xs"
                    : "bg-slate-50/60 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
                onClick={() => onStatusChange(false)}
              >
                <span className={`size-2 rounded-full ${status === false ? "bg-slate-500" : "bg-slate-300"}`} />
                <span>ฉบับร่าง (Draft)</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <FileText className="size-3.5 text-blue-600" />
                รายละเอียดหนังสือ <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                1–2,000 ตัวอักษร ({description ? description.length : 0}/2,000)
              </span>
            </div>
            <textarea
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all leading-relaxed"
              rows={4}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="กรอกเนื้อเรื่องย่อ คำอธิบาย หรือรายละเอียดเพิ่มเติมของหนังสือ..."
              maxLength={2000}
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer w-full sm:w-auto"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X className="size-4" />
            <span>ยกเลิก</span>
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 cursor-pointer w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>กำลังบันทึก...</span>
              </>
            ) : editingId ? (
              <>
                <Pencil className="size-4" />
                <span>บันทึกการแก้ไข</span>
              </>
            ) : (
              <>
                <PlusCircle className="size-4" />
                <span>บันทึกข้อมูลหนังสือ</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;
