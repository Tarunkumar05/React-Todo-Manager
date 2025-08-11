import { createContext, useContext } from 'react';

export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
  filter: 'all',
  setFilter: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  sortBy: 'date',
  setSortBy: () => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
