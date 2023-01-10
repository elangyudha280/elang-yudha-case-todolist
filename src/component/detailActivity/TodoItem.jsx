import { useEffect,useState,useContext } from "react";
import { contextDetailActivity } from "../../context/ContextDetailActivity";


let Item = ({id,title,priority})=>{
    // use context detail activity
    let {setCheckDeleteTodo,setDatasetModalDelete} = useContext(contextDetailActivity)
    
    // event set dataset id dan title modal delet
    let setDataset = (e)=>{
        let data = {
            deleteId:e.target.dataset.deleteId,
            deleteTitle:e.target.dataset.deleteTitle
        }
        setDatasetModalDelete(data)
        setCheckDeleteTodo(true)
    }
    
    
    return (
        <div className="todo-item" data-cy="todo-item">
                <input type="checkbox" className="todo-item-checkbox" data-cy="todo-item-checkbox" data-checkbox-todo={id} />
                <div className="todo-item-priority-indicator" data-cy="todo-item-priority-indicator"></div>
                <h3 className="todo-item-title" data-cy="todo-item-title">{title}</h3>
                <button className="todo-item-edit-button" data-cy="todo-item-edit-button">
                    <i className="bi bi-pencil"></i>
                </button>
                <div className="todo-item-delete-button" data-cy="todo-item-delete-button">
                <i className="bi bi-trash3" data-delete-id={id} onClick={setDataset} data-delete-title={title}></i>
                </div>
        </div>
    )
}


const TodoItem = () =>{
    // use context detail activity

    let {todoItem,setTodoItem} = useContext(contextDetailActivity);

    return (
        <section className="todolist-container">
            {
                todoItem.map(e =>{
                    return <Item key={e.id} id={e.id} title={e.title}/>
                })
            }
        </section>
    )
}

export default TodoItem;