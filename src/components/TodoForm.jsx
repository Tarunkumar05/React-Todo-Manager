import React, { useState } from "react";
import { useTodo } from "../contexts";
import { Plus } from "lucide-react";

function TodoForm() {
    const [todo, setTodo] = useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('personal');
    const [dueDate, setDueDate] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const { addTodo } = useTodo();

    const priorities = [
        { value: 'low', label: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' },
        { value: 'medium', label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
        { value: 'high', label: 'High', color: 'text-red-600', bgColor: 'bg-red-100' },
    ];

    const categories = [
        { value: 'personal', label: 'Personal', icon: '👤' },
        { value: 'work', label: 'Work', icon: '💼' },
        { value: 'study', label: 'Study', icon: '📚' },
        { value: 'health', label: 'Health', icon: '🏃' },
        { value: 'shopping', label: 'Shopping', icon: '🛒' },
    ];

    const handleSubmit = () => {
        if (!todo.trim()) return;

        addTodo({
            todo: todo.trim(),
            completed: false,
            priority,
            category,
            dueDate: dueDate || null,
            createdAt: new Date().toISOString(),
        });

        setTodo('');
        setDueDate('');
        setShowAdvanced(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="px-4 py-3 text-gray-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50"
                    >
                        <Plus className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-45' : ''}`} />
                        
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                        Add Task
                    </button>
                </div>

                {showAdvanced && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {priorities.map((p) => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map((c) => (
                                    <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoForm;
