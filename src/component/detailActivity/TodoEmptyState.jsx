
import imgEmptyTodo from '../../assets/images/emptyTodo.png'



const TodoEmptyState =()=>{
    return (
        <button className="todo-empty-state" data-cy="todo-empty-state">
            <img src={imgEmptyTodo} alt="No todo" />
        </button>
    )
}

export default TodoEmptyState;