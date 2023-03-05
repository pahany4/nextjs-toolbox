import Head from "next/head";
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Todo() {

  const [response, setResponse] = useState(null)
  const [allTodos, setAllTodos] = useState(null)
  const [todoValue, setTodoValue] = useState("")

  const saveTodo = (e) => {
    e.preventDefault()

    axios.post('/.netlify/functions/todos-create', {
      title: todoValue,
      completed: false,
    })
      .then(function (response) {
        if (response?.data) {
          setResponse(response?.data)
          setTodoValue("")
          axios.get('/.netlify/functions/todos-read-all')
            .then(function (response) {
              setAllTodos(response?.data)
              console.log(response.data);
            })
        }
      }).catch(error => console.log(error))
  }

  useEffect(() => {
    axios.get('/.netlify/functions/todos-read-all')
      .then(function (response) {
        setAllTodos(response?.data)
        console.log(response.data);
      })
  }, [])
const handleDelete = (id) => {
  axios.post('/.netlify/functions/todos-delete', {
      id
  })
    .then(function (response) {
      axios.get('/.netlify/functions/todos-read-all')
        .then(function (response) {
          setAllTodos(response?.data)
          console.log(response.data);
        })
    })
}
  return (
    <div className="container">
      <Head>
        <title>Next.js Toolbox</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <div style={{marginBottom: 40}}>
          <Link href={"/"}>главная</Link>
        </div>
        <form className='todo-create-wrapper' onSubmit={saveTodo}>
          <input
            style={{marginBottom: 20}}
            placeholder='Add a todo item'
            name='name'
            autoComplete='off'
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <div className='todo-actions'>
            <button className='todo-create-button'>
              Create todo
            </button>
          </div>
        </form>

        {allTodos?.length > 0 &&
          <div>
            {allTodos.map(todo => (
              <p>{todo.data.title} <button onClick={() => handleDelete(todo.ref["@ref"].id)}>X</button></p>

            ))}
          </div>
        }
      </main>

    </div>
  );
}
