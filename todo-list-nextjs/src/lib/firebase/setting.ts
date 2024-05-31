import { realtimeDb } from './firestore';
import {ref, set, get, update} from "firebase/database";

export const addTodo = (todo) => {
    const id = Date.now().toString();
    const newTodoRef = ref(realtimeDb, 'todos/' + id);
    return set(newTodoRef, {id,completed: false,status: "new", ...todo});
}

export const updateTodo = (todo) => {
    const todoRef = ref(realtimeDb, 'todos/' + todo.id);
    return update(todoRef, todo);
}

export const removeTodo = (id) => {
    const todoRef = ref(realtimeDb, 'todos/' + id);
    return set(todoRef, null);
}

export const fetchTodosDb = async () => {
    const todosRef = ref(realtimeDb, 'todos');
    const snapshot = await get(todosRef);
    if (snapshot.exists()) {
        return snapshot.val()
    } else {
        return {}
    }
}