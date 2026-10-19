import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const VALID_CATEGORIES = ["เทคโนโลยี", "วิทยาศาสตร์", "วรรณกรรม"];

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุชื่อหนังสือ" },
        notEmpty: { msg: "ชื่อหนังสือต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 150],
          msg: "ชื่อหนังสือต้องมีความยาวระหว่าง 1 ถึง 150 ตัวอักษร",
        },
      },
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุชื่อผู้แต่ง" },
        notEmpty: { msg: "ชื่อผู้แต่งต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 100],
          msg: "ชื่อผู้แต่งต้องมีความยาวระหว่าง 1 ถึง 100 ตัวอักษร",
        },
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุหมวดหมู่" },
        isIn: {
          args: [VALID_CATEGORIES],
          msg: "หมวดหมู่ต้องเป็น เทคโนโลยี, วิทยาศาสตร์ หรือ วรรณกรรม เท่านั้น",
        },
      },
    },
    publishedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุวันที่เผยแพร่" },
        isDate: { msg: "วันที่เผยแพร่ต้องอยู่ในรูปแบบวันที่ที่ถูกต้อง (YYYY-MM-DD)" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุรายละเอียดหนังสือ" },
        notEmpty: { msg: "รายละเอียดหนังสือต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 2000],
          msg: "รายละเอียดหนังสือต้องมีความยาวระหว่าง 1 ถึง 2,000 ตัวอักษร",
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "books",
    timestamps: true,
  },
);

export { VALID_CATEGORIES };
export default Book;
