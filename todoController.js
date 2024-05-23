import Todo from "./model.js";

//get all todo
const allTodos = async (req, res) => {
  try {
    const todo = await Todo.find({});
    res.status(200).json({
      Success: true,
      message: "All Todos",
      allTodos: todo,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Todo's not fetched",
      error: error.message,
    });
  }
};

//create todo
const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json({
      Success: true,
      message: "Todo created Successfully",
      todo: todo,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Todo not created",
      error: error.message,
    });
  }
};

//delete todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "todo deleted successfully",
      todo: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "todo not deleted",
      error: error.message,
    });
  }
};

//update todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body);
    const updateFilled = await Todo.findByIdAndUpdate(id);
    res.status(200).json({
      success: true,
      message: "todo updated successfully",
      todo: updateFilled,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "todo not updated",
      error: error.message,
    });
  }
};

//get one todo
const singleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.status(200).json({
      success: true,
      message: "todo found",
      todo: todo,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "todo not found",
      error: error.message,
    });
  }
};

export { allTodos, createTodo, deleteTodo, updateTodo, singleTodo };
