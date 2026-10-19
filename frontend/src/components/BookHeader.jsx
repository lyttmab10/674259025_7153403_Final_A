import { BookOpen, Sparkles } from "lucide-react";

const BookHeader = () => {
  return (
    <header className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
      {/* Decorative subtle background tint */}
      <div className="absolute -right-10 -top-10 size-48 rounded-full bg-blue-50/60 blur-2xl pointer-events-none" />
      <div className="absolute right-32 -bottom-10 size-36 rounded-full bg-indigo-50/50 blur-xl pointer-events-none" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <BookOpen className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200/60">
                <Sparkles className="size-3 text-blue-600" />
                ระบบจัดการหนังสือ (Books)
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              คลังหนังสือและการจัดการ
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              ค้นหา บันทึก และติดตามสถานะการเผยแพร่หนังสือได้อย่างสะดวกรวดเร็ว
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BookHeader;
