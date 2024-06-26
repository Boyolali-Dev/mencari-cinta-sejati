import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/firebase/firestore";
import { ref, get } from "firebase/database";
import { convertObjectToArray } from "../../../utils/convertArray";

export async function GET(request: NextRequest) {
  try {
    const todosRef = ref(db, "todos");
    const snapshot = await get(todosRef);
    if (!snapshot.exists()) {
      return NextResponse.json({
        status: 404,
        message: "Not Found",
        todos: [],
      });
    }
    const data = snapshot.val();
    const result = convertObjectToArray(data);
    return NextResponse.json({ todos: result });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
