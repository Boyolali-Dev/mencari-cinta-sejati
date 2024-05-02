import { NextRequest, NextResponse } from "next/server";
import todos from "./constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const todo = todos.find((item) => item.id == Number(id));
    if (todo) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        todo: todo,
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      todo: [],
    });
  }

  return NextResponse.json({ status: 200, message: "Success", todos: todos });
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { title, description, deadline, status } = res;
  const currentDate = new Date();

  if(!title || !description || !deadline || !status) {
    return NextResponse.json({ status: 400, message: "Bad Request" });
  }

  if(!["new", "inprogress", "completed", "hold"].includes(status)) {
    return NextResponse.json({
      status: 400,
      message: "Status must be new, inprogress, completed or hold",
    })
  }
  
  if(!title) {
    {
      return NextResponse.json({ status: 400, message: "Bad Request" });
    }
  }
  const NewTodo = {
    id: todos.length + 1,
    title: title,
    createAt: currentDate.toISOString(),
    deadline: deadline,
    description: description,
    completed: false,
    status: status,
  };
  const newTodos = [...todos, NewTodo];
  todos.push(NewTodo)
  return NextResponse.json({ status: 200, message: "Success", todos: newTodos });
}

export async function PUT(request: NextRequest) {
  const res = await request.json();
  const { id, completed, status } = res;

  const todo = todos.find((item) => item.id == Number(id));
  const currentTodo = [...todos]
  if (todo) {
    todo.completed = completed;
    todo.status = status
  }
  return NextResponse.json({ status: 200, message: "Success", todos: currentTodo });
}