import React from "react";
import PropTypes from "prop-types";
import Card from "../components/Content/Workspace/CardTask";

const TableOld = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Card key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
);

TableOld.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TableOld;
