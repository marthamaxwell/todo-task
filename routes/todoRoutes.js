import express from "express";
import {
  allTodos,
  createTodo,
  deleteTodo,
  singleTodo,
  updateTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/allTodos", allTodos);
router.post("/todo", createTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.get("/singletodo/:id", singleTodo);

export default router;
