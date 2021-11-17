import "./styles.css";

import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const initalTodos = [
  {
    id: uuid(),
    task: "Learn React",
    complete: true
  },
  {
    id: uuid(),
    task: "Learn Firebase",
    complete: true
  },
  {
    id: uuid(),
    task: "Learn GraphQL",
    complete: false
  }
];

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(initalTodos);
  const [filter, setFilter] = useState("all");

  function checkTask(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return { ...todo };
        }
      })
    );
  }

  const handleSubmit = (event) => {
    if (task) {
      setTodos(todos.concat({ id: uuid(), task, complete: false }));
    }
    setTask("");
    event.preventDefault();
  };

  const handleAll = () => setFilter("all");
  const handleCompleted = () => setFilter("completed");
  const handleRemaining = () => setFilter("remaining");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return { ...todo };
    } else if (filter === "completed" && todo.complete) {
      return { ...todo.complete };
    } else if (filter === "remaining" && !todo.complete) {
      return { ...todo };
    }
  });

  return (
    <div className="container">
      <h1>Tasks for today</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          placeholder="task for today"
          onChange={(event) => setTask(event.target.value)}
        />
        &nbsp;
        <button>Add task</button>
      </form>
      <div className="actions">
        <ul>
          <li onClick={handleAll}>All</li>
          <li onClick={handleCompleted}>Completed</li>
          <li onClick={handleRemaining}>Remaining</li>
        </ul>
      </div>
      <br />
      {filteredTodos.map((todo) => {
        return (
          <div key={todo.id} className="tasks">
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => checkTask(todo.id)}
            />
            &nbsp;
            {todo.task}
          </div>
        );
      })}
      <footer>
        By <a href="https://akramnarejo.github.io">akramnarejo</a>
      </footer>
    </div>
  );
}
