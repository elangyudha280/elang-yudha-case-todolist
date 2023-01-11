
import imgEmptyTodo from '../../assets/images/emptyTodo.png'
import { useContext } from 'react';
import { contextDetailActivity } from '../../context/ContextDetailActivity';

const TodoEmptyState =()=>{
    // data context detail activity
    let {setCheckAddTodo,setCheckModeEditTodo} = useContext(contextDetailActivity)
    return (
        <button className="todo-empty-state" onClick={()=>{
            setCheckAddTodo(true)
            setCheckModeEditTodo(false)
            }} data-cy="todo-empty-state">
            <img src={imgEmptyTodo} alt="No todo" />
        </button>
    )
}

export default TodoEmptyState;