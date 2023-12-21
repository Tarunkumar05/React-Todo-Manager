import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo() //useTodo se addTodo le liya

    const add = (e) => {
        e.preventDefault()

        if (!todo) return // agar todo mai kuch nhi hai toh simple sa return kr denge
        
        addTodo({ todo, completed: false})//ab yha "(todo)" nhi de skta tha kyuki method mai array ke saath object bhi spread kr rahe hai
        //or kyuki method mai "id: Date.now()" de rakha hai isliye yha dene ki jarurat nhi hai 
        // or agar field ka naam or value ka naame same hai "todo:todo" toh simple todo de skte hai
        setTodo("")
    }
    

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo} //input ki wiring state ke saath
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;