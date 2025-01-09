import { FaPen, FaClipboardList } from "react-icons/fa"
import './CSS/App.css'
import TodoList from './components/TodoList'


function App() {


  return (
    <>
      <div className='App'>
        <div className='header'>
          <div className='Logoside'>
            <FaPen />
            <h1>My Todos</h1>
            <FaClipboardList />
          </div>
        </div>
        <TodoList />
      </div>


    </>
  )
}

export default App
