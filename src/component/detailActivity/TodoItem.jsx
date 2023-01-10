




const TodoItem = () =>{
    return (
        <section className="todolist-container">
            <div className="todo-item" data-cy="todo-item">
                <input type="checkbox" className="todo-item-checkbox" data-cy="todo-item-checkbox" />
                <div className="todo-item-priority-indicator" data-cy="todo-item-priority-indicator"></div>
                <h3 className="todo-item-title" data-cy="todo-item-title">Belajar react js</h3>
                <button className="todo-item-edit-button" data-cy="todo-item-edit-button">
                    <i className="bi bi-pencil"></i>
                </button>
                <div className="todo-item-delete-button" data-cy="todo-item-delete-button">
                <i className="bi bi-trash3"></i>
                </div>
            </div>
        </section>
    )
}

export default TodoItem;