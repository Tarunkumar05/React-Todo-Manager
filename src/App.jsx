import React, { useState, useEffect } from 'react';
import { Search, Plus, Calendar, Clock, Star, Filter, CheckCircle2, Circle, Edit3, Trash2, Tag, BarChart3, Target, Zap } from 'lucide-react';
import { TodoContext } from './contexts';
import { TodoForm, TodoItem } from './components';
import Control from './components/Controls'


function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // CRUD Operations
  const addTodo = (todo) => {
    setTodos(prev => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Filter and Sort Logic
  const getFilteredAndSortedTodos = () => {
    let filtered = todos;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.todo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'high':
        filtered = filtered.filter(todo => todo.priority === 'high');
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'category':
          return a.category.localeCompare(b.category);
        case 'name':
          return a.todo.localeCompare(b.todo);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('enhanced-todos');
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('enhanced-todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = getFilteredAndSortedTodos();

  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleComplete,
      filter,
      setFilter,
      searchTerm,
      setSearchTerm,
      sortBy,
      setSortBy,
    }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              TaskMaster Pro
            </h1>
            <p className="text-gray-600">Your intelligent task management companion</p>
          </div>

          <TodoForm />
          <Control />

          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchTerm || filter !== 'all' ? 'No tasks found' : 'No tasks yet'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm || filter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Create your first task to get started'}
                </p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  {todos.filter(t => t.completed).length} of {todos.length} tasks completed
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
