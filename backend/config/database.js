import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl:
        process.env.DB_SSL === "false"
          ? false
          : {
              require: true,
              rejectUnauthorized: false,
            },
    },
  });
} else {
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || 5432;
  const dialectOptions =
    process.env.DB_SSL === "true"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {};

  sequelize = new Sequelize(
    process.env.DB_NAME || "books_db",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "",
    {
      host,
      port,
      dialect: "postgres",
      logging: false,
      dialectOptions,
    },
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL successfully!");
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
    });
    console.log("Database & Tables Synchronized!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};

export { sequelize, connectDB };
