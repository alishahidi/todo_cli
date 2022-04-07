import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(__dirname, "..", "storage", "todos.sqlite"),
  logging: false
});