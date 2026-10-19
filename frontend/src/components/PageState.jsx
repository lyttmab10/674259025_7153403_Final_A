import { AlertCircle, Loader2 } from "lucide-react";

function PageState({ loading, error }) {
  if (loading) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xs">
        <Loader2 className="size-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-slate-500">
          กำลังโหลดข้อมูลหนังสือ...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-rose-800 shadow-2xs"
      >
        <AlertCircle className="size-5 shrink-0 text-rose-500 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-rose-900">เกิดข้อผิดพลาดในการโหลดข้อมูล</h4>
          <p className="mt-0.5 text-xs text-rose-700">{error}</p>
        </div>
      </div>
    );
  }

  return null;
}

export default PageState;
