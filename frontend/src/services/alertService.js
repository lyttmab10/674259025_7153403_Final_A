import Swal from "sweetalert2";

const getErrorMessage = (error) => {
  if (typeof error === "string") return error;

  try {
    const response = JSON.parse(error.message);
    return response.error || response.message || error.message;
  } catch {
    return error?.message || "เกิดข้อผิดพลาดในการทำรายการ";
  }
};

const showError = (error) =>
  Swal.fire({
    icon: "error",
    title: "เกิดข้อผิดพลาด",
    text: getErrorMessage(error),
    confirmButtonText: "ตกลง",
  });

const showSuccess = (title, text = "") =>
  Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1600,
    showConfirmButton: false,
  });

const confirmDelete = (bookTitle = "") =>
  Swal.fire({
    icon: "warning",
    title: "ยืนยันการลบหนังสือ",
    text: bookTitle
      ? `คุณต้องการลบหนังสือ "${bookTitle}" ใช่หรือไม่?`
      : "คุณต้องการลบรายการหนังสือนี้ใช่หรือไม่?",
    showCancelButton: true,
    confirmButtonText: "ลบหนังสือ",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    reverseButtons: true,
  }).then((result) => result.isConfirmed);

export { confirmDelete, showError, showSuccess };
