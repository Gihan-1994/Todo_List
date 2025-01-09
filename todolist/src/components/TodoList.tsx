import { useState } from 'react'
import TodoTypes from '../Todo'
import TodoService from '../TodoService'
import { FaEdit, FaCheck } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import TodoForm from './TodoForm'
import '../CSS/TodoList.css'

const TodoList = () => {
    const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [edithingTodoId, setEditedTodoId] = useState<number | null>(null);
    const [editedTodoText, setEditedTodoText] = useState<string>("");


    const handleTodoStart = (id: number, text: string) => {
        setEditedTodoId(id);
        setEditedTodoText(text);
    }

    const handleTodoCancel = () => {
        setEditedTodoId(null);
        setEditedTodoText(" ");
    }

    const handleTodoSave = (id: number) => {
        if (editedTodoText.trim() !== '') {
            const updateTodo = TodoService.updateTodo({
                id,
                text: editedTodoText,
                completed: false
            }
            );
            setTodos((prvTodos) => prvTodos.map((todo) => (todo.id === id ? updateTodo : todo))
            );

            setEditedTodoId(null);
            setEditedTodoText("");
        }
    }
    const handleDeleteTodo = (id: number) => {
        TodoService.deleteTodo(id);
        setTodos((prvTodo) => prvTodo.filter((todo) => todo.id !== id))
    }

    return (
        <div className='todoContainer'>

            <div>
                <TodoForm setTodos={setTodos} />
            </div>
            <div className="todos">


                {todos.map((todo) => (
                    <div className='items' key={todo.id} >
                        {edithingTodoId == todo.id ? (
                            <div className='editText'>
                                <input type='text' value={editedTodoText}
                                    onChange={(e) => setEditedTodoText(e.target.value)}
                                    autoFocus={true} />
                                <button onClick={() => handleTodoSave(todo.id)}>
                                    <FaCheck />
                                </button>
                                <button className='cancelBtn' onClick={() => handleTodoCancel()}>
                                    <GiCancel />
                                </button>

                            </div>
                        ) : (
                            <div className="editBtn">
                                <span>{todo.text}</span>
                                <button onClick={() => handleTodoStart(todo.id, todo.text)}>
                                    <FaEdit />
                                </button>
                            </div>)

                        }
                        <button onClick={() => handleDeleteTodo(todo.id)}>
                            <RiDeleteBin5Fill />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoList
