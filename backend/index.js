import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import bookRouter from "./router/bookRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const corsEnv = process.env.CORS_ORIGIN;
    if (!corsEnv || corsEnv.trim() === "*") {
      return callback(null, true);
    }
    const allowedOrigins = corsEnv.split(",").map((o) => o.trim());
    if (
      allowedOrigins.includes(origin) ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:")
    ) {
      return callback(null, true);
    }
    return callback(new Error("ไม่อนุญาตโดย CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "ยินดีต้อนรับสู่ RESTful API ระบบจัดการหนังสือ (Books Management API)",
  });
});

app.use("/api/books", bookRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "รูปแบบข้อมูล JSON ไม่ถูกต้อง",
    });
  }
  console.error("Express Error:", err.message);
  return res.status(500).json({
    success: false,
    message: "เกิดข้อผิดพลาดภายในระบบ",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT} (0.0.0.0)`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
