import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/firebase/firestore";
import { ref, get } from "firebase/database";

const convertObjectToArray = (object: { [key: string]: any}): any[] => {
  return Object.values(object);
};

export async function GET(request: NextRequest) {
  try {
    const todosRef = ref(db, 'todos');
    const snapshot = await get(todosRef);
    if (!snapshot.exists()) {
      return NextResponse.json({
        status: 404,
        message: "Not Found",
        todos: []
      });
    }
    const data = snapshot.val();
    const result = convertObjectToArray(data);
    return NextResponse.json({ todos: result });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
