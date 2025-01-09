import TodoTypes from "./Todo";


const Local_Storage_Key = 'todos';

const TodoService = {
    getTodos: (): TodoTypes[] => {
        const todoStr = localStorage.getItem(Local_Storage_Key)

        return todoStr ? JSON.parse(todoStr) : []
    },

    addTodos: (text: string): TodoTypes => {
        const todos = TodoService.getTodos();
        const newTodo: TodoTypes = { id: todos.length + 1, text, completed: false }
        const updateTodos = [...todos, newTodo]
        localStorage.setItem(Local_Storage_Key, JSON.stringify(updateTodos))
        return newTodo
    },

    updateTodo: (todo: TodoTypes): TodoTypes => {
        const todos = TodoService.getTodos();
        const updateTodo = todos.map((t) => (t.id === todo.id ? todo : t))
        localStorage.setItem(Local_Storage_Key, JSON.stringify(updateTodo))
        return todo
    },

    deleteTodo: (id: number): void => {
        const todos = TodoService.getTodos();
        const updatedTodos = todos.filter((todo) => todo.id !== id)
        localStorage.setItem(Local_Storage_Key, JSON.stringify(updatedTodos))
    }


}
export default TodoService




