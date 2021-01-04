/** @format */
import React, { useEffect } from "react";
import "./App.css";
import TodoList from "./todo/TodoList";
import Context from "./context";
import Loader from "./loader";

const AddTodo = React.lazy(() => import("./todo/AddTodo"));

function App() {
  let [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
        setLoading(false);
      });
  }, []);
  function toggleTodo(id) {
    setTodos(
      (todos = todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }))
    );
  }
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1 className="main__title">Список дел</h1>
        <React.Suspense fallback={<p>Загрузка...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>Дел нет</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
