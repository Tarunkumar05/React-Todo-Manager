# React + Vite
This React Todo List app allows users to manage tasks efficiently. The project structure includes key components and contexts for seamless todo management.

Features:-
1.Add Todos: Easily add new tasks with the TodoForm component.
2.Edit and Complete: Edit todo text and mark tasks as completed.
3.Delete Todos: Remove unwanted tasks with a simple click.

Components:-
(TodoForm)
1.Form for adding new todos.
2.Input field for todo text.
3."Add" button to submit the todo.

(TodoItem)
1.Displays individual todos.
2.Checkbox for completion status.
3.Text input for editing todo text.
4."Edit" and "Delete" buttons for todo management.

Contexts:-
(TodoContext)
1.Manages todo state.
2.Functions for adding, updating, deleting, and toggling completion.

Local Storage:-
1.Todos are stored in the browser's local storage to persist data between sessions.
2.Uses useEffect to load and save todos from/to local storage.
