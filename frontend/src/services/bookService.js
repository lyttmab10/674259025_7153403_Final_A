const rawBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const API_BASE = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl}/api`;
const API_URL = `${API_BASE}/books`;

const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const errorMsg =
        data?.message ||
        data?.error ||
        `เกิดข้อผิดพลาดในการเชื่อมต่อ (รหัสสถานะ: ${response.status})`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ Backend ได้ กรุณาตรวจสอบการเชื่อมต่อ",
        { cause: error },
      );
    }
    throw error;
  }
};

const getBooks = async ({ q, category } = {}) => {
  const params = new URLSearchParams();
  if (q && q.trim()) {
    params.append("q", q.trim());
  }
  if (category && category.trim()) {
    params.append("category", category.trim());
  }

  const queryStr = params.toString();
  const url = queryStr ? `${API_URL}?${queryStr}` : API_URL;
  const res = await request(url);
  return Array.isArray(res) ? res : res?.data || [];
};

const getBook = async (id) => {
  const res = await request(`${API_URL}/${id}`);
  return res?.data || res;
};

const createBook = async (bookData) => {
  const res = await request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  return res?.data || res;
};

const updateBook = async (id, bookData) => {
  const res = await request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  return res?.data || res;
};

const deleteBook = async (id) => {
  const res = await request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res?.data || res;
};

export { getBooks, getBook, createBook, updateBook, deleteBook };
