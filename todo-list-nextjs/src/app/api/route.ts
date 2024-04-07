import { NextRequest, NextResponse } from "next/server";

const todos = [
  {
    id: 1,
    title: "Todo 1",
    createAt: "2024-03-29 23:39",
    deadline: "2024-03-29 23:39",
    description: "Todo 1 description",
    completed: false,
    status: "new"
  },
  {
    id: 2,
    title: "Todo 2",
    createAt: "2024-03-29 23:39",
    deadline: "2024-03-29 23:39",
    description: "Todo 2 description",
    completed: false,
    status: "new"
  },
  {
    id: 3,
    title: "Todo 3",
    createAt: "2024-03-29 23:39",
    deadline: "2024-03-29 23:39",
    description: "Todo 3 description",
    completed: false,
    status: "new"
  },
];

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
  
  const NewTodo = {
    id: todos.length + 1,
    title: title,
    createAt: currentDate.toISOString(),
    deadline: deadline,
    description: description,
    completed: false,
    status: status,
  };
  if(!NewTodo.title) {
    return NextResponse.json({ status: 400, message: "Bad Request" });
  }
  todos.push(NewTodo)
  return NextResponse.json({ status: 200, message: "Success", todos: todos });
}

export async function PUT(request: NextRequest) {
  const res = await request.json();
  const { id, completed, status } = res;

  const todo = todos.find((item) => item.id == Number(id));
  if (todo) {
    todo.completed = completed;
    todo.status = status
  }
  return NextResponse.json({ status: 200, message: "Success", todos: todos });
}