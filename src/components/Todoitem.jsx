import React, { useState } from "react";
import { useTodo } from "../contexts";
import { Calendar, CheckCircle2, Circle, Clock, Edit3, Tag, Trash2 } from "lucide-react";

function TodoItem({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const priorityColors = {
        low: 'border-l-green-500 bg-green-50',
        medium: 'border-l-yellow-500 bg-yellow-50',
        high: 'border-l-red-500 bg-red-50',
    };

    const categoryIcons = {
        personal: '👤',
        work: '💼',
        study: '📚',
        health: '🏃',
        shopping: '🛒',
    };

    const handleSave = () => {
        if (editText.trim()) {
            updateTodo(todo.id, { ...todo, todo: editText.trim() });
        }
        setIsEditing(false);
    };

    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
    const isDueToday = todo.dueDate && new Date(todo.dueDate).toDateString() === new Date().toDateString();

    return (
        <div className={`group bg-white rounded-xl shadow-sm border-l-4 p-4 transition-all duration-200 hover:shadow-md ${priorityColors[todo.priority]} ${todo.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-3">
                <button
                    onClick={() => toggleComplete(todo.id)}
                    className="mt-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                    {todo.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                        <Circle className="w-5 h-5" />
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave();
                                if (e.key === 'Escape') {
                                    setEditText(todo.todo);
                                    setIsEditing(false);
                                }
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                    ) : (
                        <div>
                            <p className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {todo.todo}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    {categoryIcons[todo.category]} {todo.category}
                                </span>
                                {todo.dueDate && (
                                    <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-600' : isDueToday ? 'text-orange-600' : ''}`}>
                                        <Calendar className="w-3 h-3" />
                                        {new Date(todo.dueDate).toLocaleDateString()}
                                        {isOverdue && ' (Overdue)'}
                                        {isDueToday && ' (Today)'}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(todo.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setIsEditing(true)}
                        disabled={todo.completed}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-blue-50"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}


export default TodoItem;
