import {createContext, useContext} from "react"

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const useTodo = () => {
    return useContext(TodoContext) // jb bhi useContext use krenge isme context dena pdega
}

// ab provider yha se export krte hai vrna main file mai jaake sb kuch wrap krna pdega todocontext.provider

export const TodoProvider = TodoContext.Provider