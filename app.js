#!/usr/bin/env node

import { Command } from "commander";
import gradient from "gradient-string";
import figlet from "figlet";
import ora from "ora";
import { Todo } from "./model/todo.js";
import { sequelize } from "./db/db.js";
import { Table } from "console-table-printer";
import chalk from "chalk";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const banner = async () => {
  console.log("\n");
  console.log(gradient.pastel(figlet.textSync("Todo App", { font: "Small" })));
  console.log("\n");
};

await banner();
await sequelize.sync();
const program = new Command();
program
  .option("-t, --title  <title>", "title of todo")
  .option("-d, --description  <description>", "description of todo");

program.name("todo-util").description("Todo cli app").version("1.0.0");

program
  .command("all")
  .description("Get all todo")
  .action(async (str, options) => {
    const loader = ora("Loading .....").start();
    const todos = await Todo.findAll();
    const table = new Table({
      title: "Todos list",
      columns: [
        { name: "id", alignment: "center", maxLen: 5 },
        { name: "title", alignment: "left", maxLen: 5 },
        { name: "description", alignment: "left", maxLen: 5 },
        { name: "completed", alignment: "center", maxLen: 5 },
      ],
    });
    todos.map((item) => {
      table.addRow({
        id: item.id,
        title: item.title,
        description: item.description,
        completed: item.done ? chalk.green("Y") : chalk.red("N"),
      });
    });
    await delay(500);
    loader.stop();
    table.printTable();
    console.log("\n");
  });

program
  .command("add")
  .description("Add new todo item")
  .argument("<title>", "title of todo")
  .argument("<description>", "description of todo")
  .action(async (title, description) => {
    const loader = ora("Loading .....").start();
    await Todo.create({ title, description });
    await delay(500);
    loader.text = "Added Successfully.";
    loader.succeed();
    loader.stop();
    console.log("\n");
  });

program
  .command("edit")
  .description("Edit todo item")
  .argument("<id>", "id of todo")
  .option("-t, --title  <title>", "title of todo")
  .option("-d, --description  <description>", "description of todo")
  .action(async (id, options) => {
    const loader = ora("Loading .....").start();
    const todo = await Todo.findByPk(id);
    if (options.description) todo.description = options.description;
    if (options.title) todo.title = options.title;
    await todo.save();
    await delay(500);
    loader.text = "Added Successfully.";
    loader.succeed();
    loader.stop();
    console.log("\n");
  });

program
  .command("done")
  .description("Done todo")
  .argument("<id>", "id of todo")
  .action(async (id) => {
    const loader = ora("Loading .....").start();
    const todo = await Todo.findByPk(id);
    todo.done = true;
    await todo.save();
    await delay(500);
    loader.text = "Added Successfully.";
    loader.succeed();
    loader.stop();
    console.log("\n");
  });

program
  .command("undone")
  .description("UnDone todo")
  .argument("<id>", "id of todo")
  .action(async (id) => {
    const loader = ora("Loading .....").start();
    const todo = await Todo.findByPk(id);
    todo.done = false;
    await todo.save();
    await delay(500);
    loader.text = "Added Successfully.";
    loader.succeed();
    loader.stop();
    console.log("\n");
  });

program
  .command("del")
  .description("Remove item from todos")
  .argument("<id>", "id from todo item")
  .action(async (id) => {
    const loader = ora("Loading .....").start();
    await Todo.destroy({ where: { id } });
    await delay(500);
    loader.text = "Removed Successfully.";
    loader.succeed();
    loader.stop();
    console.log("\n");
  });

program.parse();
