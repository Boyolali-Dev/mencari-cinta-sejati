import { NextRequest, NextResponse } from "next/server";
const todos = [
  {
    id: 1,
    title: "Todo 1",
    description: "Todo 1 description",
    createAt: "2024-03-29 23:39",
    completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    description: "Todo 2 description",
    createAt: "2024-03-29 23:39",
    completed: false,
  },
  {
    id: 3,
    title: "Todo 3",
    description: "Todo 3 description",
    createAt: "2024-03-29 23:39",
    completed: false,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const todo = todos.find((item) => item.id == Number(id));
    if(todo) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        todo: todo,
      })
    }
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      todo: [],
    })
  }

  return NextResponse.json({status: 200, message: "Success", todos}); 
}
