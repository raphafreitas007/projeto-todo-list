import logo from './logo.svg';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'

const Todos = ({ todos }) => {
  return (<div className="todos">
      {todos.map((todo) => {
        return (
          <div className="todo">
            <p>{todo.name}</p>
            <button className="checkbox" style={{backgroundColor: todo.status ? "#008000" : "#FFFFFF"}}></button>
            <button>
              <AiOutlineEdit size={20}color={"#64697b"}></AiOutlineEdit> 
            </button>
            <button>
              <AiOutlineDelete size={20}color={"#64697b"}></AiOutlineDelete>
            </button>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  
  async function handleWithNewButton(){
    setInputVisibility(!inputVisibility)
  }
  
  async function getTodos(){
    const response = await axios.get("http://localhost:3333/todos")
    setTodos(response.data)
  }

  async function createTodo(){
    const response =  await axios.post("http://localhost:3333/todos", {
      name: inputValue
    })
    getTodos()
    setInputVisibility(!inputVisibility)
  }
  
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [inputVisibility, setInputVisibility] = useState(false)

  useEffect(()=>{
    getTodos()
  })

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Lista de Tarefas!</h1>
        </div>
        <Todos todos={todos}></Todos>
      <input 
        value={inputValue}
        style={{display: inputVisibility ? "block" : "none"}}
        onChange={(event)=> {
          setInputValue(event.target.value)
        }}
        className="inputName"></input>
      <button onClick={inputVisibility ? createTodo : handleWithNewButton} className="newTaskButton">
        {inputVisibility ? "Adicionar" : "+ Nova Tarefa"}
      </button>
      </header>
    </div>
  );
}

export default App;