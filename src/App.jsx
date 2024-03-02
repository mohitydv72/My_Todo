import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";


// import './App.css'

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showtodos, setshowtodos] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
      
    }
  
  }, []);
  // useEffect(() => {
  //   const todoString = localStorage.getItem("todos");
  //   console.log("Todo string from localStorage:", todoString);
  //   try {
  //     if (todoString) {
  //       const parsedTodos = JSON.parse(todoString);
  //       console.log("Parsed todos:", parsedTodos);
  //       settodos(parsedTodos);
  //     }
  //   } catch (error) {
  //     console.error("Error parsing todos from localStorage:", error);
  //   }
  // }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    let editedTodo = prompt("Edit your todo", newTodos[index].todo);
    newTodos[index].todo = editedTodo;
    settodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    // let confirmfun =window.confirm("Are you sure you want to delete this todo?");
    // if (confirmfun) {
    let newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
    saveToLS();
   
    // }

    // let newTodos = todos.filter((item) => item.id !== id);
    // settodos(newTodos);
    // saveToLS();
  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    settodo("");
    saveToLS();
   
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    settodos(newTodos);
    saveToLS();
  };

  const toggleTodos = () => {
    setshowtodos(!showtodos);
  };

  return (
    <>
      <Navbar />
      <div className="md:container bg-orange-300 mx-auto md:my-5 md:p-10 py-8 px-4 md:rounded-xl min-h-screen md:min-h-[80vh] md:w-1/2">
        <div className="myTodo flex flex-col justify-center items-center ">
          <h1 className="text-center font-bold text-2xl">My Todo - You can Add your Daily task here</h1>
          <h1 className="text-xl font-sans my-4">Add Todo</h1>
          <div className=" flex addTodo  w-full justify-center my-4">
            <input
              onChange={handleChange}
              value={todo}
              className="bg-slate-50 rounded-md w-full md:w-3/4 px-2 py-1"
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={todo === ""}
              className="bg-blue-600 disabled:bg-blue-600 rounded-xl px-4 py-2 mx-2 md:mx-6 hover:bg-blue-800 text-white font-bold"
            >
              Add
            </button>
          </div>
          <h1 className="font-bold text-2xl">Your Todos</h1>
          <div className="showtodoscomp md:my-4 my-2 flex items-center">
            <input
            className="w-5 h-5"
              type="checkbox"
              onChange={toggleTodos}
              checked={showtodos}
              name=""
              id=""
            />
            <p className="mx-4 text-xl">Show Completed Todos </p>
          </div>
          <div className="todos text-center flex  w-full flex-col items-center my-4 ">
            {todos.length === 0 && (
              <h1 className="text-center font-bold text-lg">
                No Todos To Display
              </h1>
            )}
            {todos.map((item) => {
              return (showtodos || !item.iscompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-full justify-around my-2"
                >
                  <div className="flex  gap-3 items-center w-3/4">
                    <input
                      className="w-5 h-5"
                      type="checkbox"
                      onChange={handleCheckbox}
                      checked={item.iscompleted}
                      name={item.id}
                      id=""
                    />

                    <div className={item.iscompleted ? "line-through" : ""}>
                      <h1 className="text-xl">{item.todo}</h1>
                    </div>
                  </div>
                  <div className="btns   ">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-blue-600 rounded-xl px-2.5 py-2 mx-1 hover:bg-blue-800 text-white font-bold"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-blue-600 rounded-xl px-2.5 py-2 mx-1 hover:bg-blue-800 text-white font-bold"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
