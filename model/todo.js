import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Todo = sequelize.define("Todos", {
  //? Model attributes
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});