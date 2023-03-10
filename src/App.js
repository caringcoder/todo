import React, { useState, useEffect } from 'react'
import './App.css';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import LoadingBar from 'react-top-loading-bar'
import Alert from './components/Alert';


function App() {
  const [mode, setMode] = useState("light")
  const [progress, setProgress] = useState(0)
  const [alert, setAlert] = useState(null)
  

  let inItTodo;
  if (localStorage.getItem('todos') === null) {
    inItTodo = [];
  }
  else {
    inItTodo = JSON.parse(localStorage.getItem("todos"))
  }
  // const [todos, setTodos] = useState(inItTodo);

  const onDelete = (todo) => {
    // console.log("on Delete", todo)
    setTodos(todos.filter((element) => {
      return element !== todo;
    }))
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const addTodo = (title, description) => {
    // console.log(title, description)
    let sno;
    if (todos.length === 0)
      sno = 0;
    else
      sno = todos[todos.length - 1].sno + 1;

    const myTodo = {
      sno: sno,
      title: title,
      description: description,
    }
    // console.log(myTodo)
    setTodos([...todos, myTodo])

    // localStorage.setItem('todos', JSON.stringify(todos))
  }
  const [todos, setTodos] = useState(inItTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])

  const toggleDarkMode = () => {
    if (mode === 'light') {
      document.body.style.backgroundColor = '#272730';
      document.body.style.color = 'white';
      setMode('dark')
    }
    else {
      setMode('light')
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black'
    }
  }

  const showAlert = (type, message) => {
    setAlert({
      type, message
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <>
      <LoadingBar color='#f11946' progress={progress} />
      <Navbar title={"ToDo List"} mode={mode} toggleDarkMode={toggleDarkMode} />
      <Alert alert={alert} />
      {/* <NightModeAlert nightMode={nightMode} /> */}
      
      <AddTodo addTodo={addTodo} setProgress={setProgress} mode={mode} showAlert={showAlert} />
      <Todo todos={todos} onDelete={onDelete} mode={mode} />
      <Footer mode={mode} />
    </>
  );
}

export default App;
