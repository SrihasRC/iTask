import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const handleAdd = () => {
    if (!todo) return;
    const updatedTodos = ([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodos(updatedTodos)
    settodo("")
    saveToLS(updatedTodos)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS(newTodos)
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS(newTodos)
  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    saveToLS(newtodos)
  }
  const toggleFinish = (e) => {
    setshowFinished(!showFinished)
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <>
      <Navbar />
      <div className="md:container md:w-[35%] md:mx-auto mx-3 my-4 bg-violet-100 p-5 rounded-xl min-h-[80vh] shadow-md">
        <h1 className='font-bold text-2xl text-center'>iTask</h1>
        <div className="add-todo my-5 flex flex-col gap-2">
          <h2 className='text-lg font-semibold'>Add Todos</h2>
          <div className="flex">
            <input onChange={handleChange} onKeyDown={handleKeyDown} value={todo} className='w-full py-1 px-4 rounded-full' type="text" name="" id="" />
            <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 rounded-full text-sm font-bold mx-3'>Save</button>
          </div>
        </div>

        <div className="flex items-center">
          <input onChange={toggleFinish} type="checkbox" checked={showFinished} id="show" />
          <label htmlFor="show" className='mx-2'>Show Finished</label>
        </div>

        <div className="h-[1px] w-[90%] bg-black opacity-20 mx-auto mt-3 mb-2"></div>

        <h2 className="text-lg font-semibold my-3">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='my-3'>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex gap-3">
                <input onChange={handleCheckbox} className='' name={item.id} checked={item.isCompleted} type="checkbox" id="todoitem" />
                <label htmlFor="todoitem" className={item.isCompleted ? "line-through cursor-pointer" : "cursor-pointer"} >{item.todo}</label>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 rounded-md text-sm font-bold mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 rounded-md text-sm font-bold mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
