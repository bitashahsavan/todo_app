import React, { useState, useEffect } from 'react';
import './App.css';
//import componenets
import Form from './components/Form';
import TodoList from './components/TodoList';


function App() {
  //this usestate get inputvalue
  //inputtext is stuff that clinet inter in input and todos save the input as object
  const [inputText, setInputText] = useState("");

  const [todos, setTodos] = useState([]);
  //state about filtering data
  const [status, setStatus] = useState("all");

  const [filteredTodos, setFilteredTodos] = useState([]);

  //useEffect stuff
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  //function
  const filterHandler = () => {
    switch (status) {
      case "completed ":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  //save to local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem(("Todos") === null)) {
      localStorage.setItem("Todos", JSON.stringify([]));

    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
      <header>
        <h1> Bita`s Todo app </h1>
      </header>
      <Form //all usestate define as props for we can use them in enother file
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
