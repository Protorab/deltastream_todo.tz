/** @format */

import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const classes = [];
  if (todo.completed) {
    classes.push("done");
  }

  return (
    <li className="todo__item">
      <span className={classes.join(" ")}>
        <input
          id={"todo__id-" + todo.id}
          className="todo__check"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onChange(todo.id)}
        />
        <label htmlFor={"todo__id-" + todo.id}>
          <strong>{index + 1}</strong>
          &nbsp;
          {todo.title}
        </label>
      </span>
      <button className="todo__remove" onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  );
}
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
