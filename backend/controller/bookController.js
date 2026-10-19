import { Op } from "sequelize";
import Book, { VALID_CATEGORIES } from "../model/Book.js";

const isPositiveInteger = (value) => {
  if (value === undefined || value === null) return false;
  const str = String(value).trim();
  if (!/^\d+$/.test(str)) return false;
  const num = Number(str);
  return Number.isInteger(num) && num > 0;
};

const isValidDate = (dateString) => {
  if (typeof dateString !== "string") return false;
  const str = dateString.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
  const [year, month, day] = str.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const validateBookPayload = (payload, isUpdate = false) => {
  const errors = [];
  const { title, author, category, publishedDate, description, status } = payload;

  // Title validation
  if (!isUpdate || title !== undefined) {
    if (title === undefined || title === null || typeof title !== "string") {
      errors.push("กรุณาระบุชื่อหนังสือ");
    } else {
      const trimmed = title.trim();
      if (trimmed.length === 0) {
        errors.push("ชื่อหนังสือต้องไม่เป็นค่าว่างหรือช่องว่างล้วน");
      } else if (trimmed.length > 150) {
        errors.push("ชื่อหนังสือต้องมีความยาวไม่เกิน 150 ตัวอักษร");
      }
    }
  }

  // Author validation
  if (!isUpdate || author !== undefined) {
    if (author === undefined || author === null || typeof author !== "string") {
      errors.push("กรุณาระบุชื่อผู้แต่ง");
    } else {
      const trimmed = author.trim();
      if (trimmed.length === 0) {
        errors.push("ชื่อผู้แต่งต้องไม่เป็นค่าว่างหรือช่องว่างล้วน");
      } else if (trimmed.length > 100) {
        errors.push("ชื่อผู้แต่งต้องมีความยาวไม่เกิน 100 ตัวอักษร");
      }
    }
  }

  // Category validation
  if (!isUpdate || category !== undefined) {
    if (category === undefined || category === null || typeof category !== "string") {
      errors.push("กรุณาระบุหมวดหมู่");
    } else {
      const trimmed = category.trim();
      if (!VALID_CATEGORIES.includes(trimmed)) {
        errors.push("หมวดหมู่ต้องเป็น เทคโนโลยี, วิทยาศาสตร์ หรือ วรรณกรรม เท่านั้น");
      }
    }
  }

  // Published Date validation
  if (!isUpdate || publishedDate !== undefined) {
    if (publishedDate === undefined || publishedDate === null) {
      errors.push("กรุณาระบุวันที่เผยแพร่");
    } else if (!isValidDate(String(publishedDate))) {
      errors.push("วันที่เผยแพร่ต้องอยู่ในรูปแบบ YYYY-MM-DD และเป็นวันที่ที่ถูกต้อง");
    }
  }

  // Description validation
  if (!isUpdate || description !== undefined) {
    if (description === undefined || description === null || typeof description !== "string") {
      errors.push("กรุณาระบุรายละเอียดหนังสือ");
    } else {
      const trimmed = description.trim();
      if (trimmed.length === 0) {
        errors.push("รายละเอียดหนังสือต้องไม่เป็นค่าว่างหรือช่องว่างล้วน");
      } else if (trimmed.length > 2000) {
        errors.push("รายละเอียดหนังสือต้องมีความยาวไม่เกิน 2,000 ตัวอักษร");
      }
    }
  }

  // Status validation (optional, defaults to true)
  if (status !== undefined && typeof status !== "boolean" && status !== "true" && status !== "false") {
    errors.push("สถานะต้องเป็นค่าจริง (true) หรือเท็จ (false)");
  }

  return errors;
};

// GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const { q, category } = req.query;
    const where = {};

    if (q && typeof q === "string" && q.trim().length > 0) {
      where.title = {
        [Op.iLike]: `%${q.trim()}%`,
      };
    }

    if (category && typeof category === "string" && category.trim().length > 0) {
      where.category = category.trim();
    }

    const books = await Book.findAll({
      where,
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      message: "ดึงรายการหนังสือสำเร็จ",
      data: books,
    });
  } catch (error) {
    console.error("getAllBooks error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

// GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "รหัสหนังสือ (ID) ต้องเป็นจำนวนเต็มบวก",
      });
    }

    const book = await Book.findByPk(Number(id));
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบหนังสือที่ระบุ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ดึงข้อมูลหนังสือสำเร็จ",
      data: book,
    });
  } catch (error) {
    console.error("getBookById error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

// POST /api/books
const createBook = async (req, res) => {
  try {
    const errors = validateBookPayload(req.body, false);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    const { title, author, category, publishedDate, description, status } = req.body;

    const parsedStatus =
      status === undefined ? true : status === true || status === "true";

    const newBook = await Book.create({
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      publishedDate: String(publishedDate).trim(),
      description: description.trim(),
      status: parsedStatus,
    });

    return res.status(201).json({
      success: true,
      message: "เพิ่มหนังสือสำเร็จ",
      data: newBook,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: error.errors.map((e) => e.message).join(", "),
      });
    }
    console.error("createBook error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

// PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "รหัสหนังสือ (ID) ต้องเป็นจำนวนเต็มบวก",
      });
    }

    const book = await Book.findByPk(Number(id));
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบหนังสือที่ระบุ",
      });
    }

    const errors = validateBookPayload(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    const { title, author, category, publishedDate, description, status } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title.trim();
    if (author !== undefined) updates.author = author.trim();
    if (category !== undefined) updates.category = category.trim();
    if (publishedDate !== undefined) updates.publishedDate = String(publishedDate).trim();
    if (description !== undefined) updates.description = description.trim();
    if (status !== undefined) {
      updates.status = status === true || status === "true";
    }

    await book.update(updates);

    return res.status(200).json({
      success: true,
      message: "แก้ไขข้อมูลหนังสือสำเร็จ",
      data: book,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: error.errors.map((e) => e.message).join(", "),
      });
    }
    console.error("updateBook error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

// DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "รหัสหนังสือ (ID) ต้องเป็นจำนวนเต็มบวก",
      });
    }

    const book = await Book.findByPk(Number(id));
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบหนังสือที่ระบุ",
      });
    }

    await book.destroy();

    return res.status(200).json({
      success: true,
      message: "ลบหนังสือสำเร็จ",
      data: book,
    });
  } catch (error) {
    console.error("deleteBook error:", error.message);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
