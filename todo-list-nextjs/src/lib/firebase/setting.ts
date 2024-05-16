import { db } from './firestore';
import {ref, set, get, update} from "firebase/database";

export const addTodo = (todo) => {
    const id = Date.now().toString();
    const newTodoRef = ref(db, 'todos/' + id);
    return set(newTodoRef, {id,completed: false,status: "new", ...todo});
}

export const updateTodo = (todo) => {
    const todoRef = ref(db, 'todos/' + todo.id);
    return update(todoRef, todo);
}

export const removeTodo = (todo) => {
    const todoRef = ref(db, 'todos/' + todo.id);
    return set(todoRef, null);
}

export const fetchTodosDb = async () => {
    const todosRef = ref(db, 'todos');
    const snapshot = await get(todosRef);
    if (snapshot.exists()) {
        return snapshot.val()
    } else {
        return {}
    }
}