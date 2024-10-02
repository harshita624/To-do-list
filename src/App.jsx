import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { v4 as uuidv4 } from 'uuid';
import viteLogo from "/vite.svg";
import { FaEdit } from "react-icons/fa";
import Navbar from "./components/Navbar";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLs();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-3 md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[70vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">RIS-MANAGE YOUR TODOS AT ONE PLACE</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-5 py-1" />
          <button
            onClick={handleAdd} disabled={todo.length <= 3}
            className="bg-violet-800 disabled:bg-violet-950 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md"
          >
            Save
          </button>
        </div>
        <hr className="h-5" />
        <input className="my-4 m-2" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-full justify-between my-3">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
