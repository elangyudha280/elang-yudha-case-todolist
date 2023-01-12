import { useEffect,useState,useContext } from "react";
import { contextDetailActivity } from "../../context/ContextDetailActivity";


let Item = ({id,title,priority,activeTodo})=>{
    // use context detail activity
    let {setCheckDeleteTodo,setDatasetModalDelete,setCheckAddTodo,setCheckModeEditTodo,checkUpdateTodo,setCheckUpdateTodo} = useContext(contextDetailActivity)
    
    // event set dataset id dan title modal delet
    let setDataset = (e)=>{
        let data = {
            deleteId:id,
            deleteTitle:title
        }
        setDatasetModalDelete(data)
        setCheckDeleteTodo(true)
    }
    
    // mode edit todo item
    let modeEditTodo = (e)=>{
         let dataModalEdit = {
            editId:id,
            editTitle:title,
            editPriority:priority
        }
        setDatasetModalDelete(dataModalEdit)
        // check untuk menampilkan modal tambah todo item
        setCheckAddTodo(true)
        // check untuk menandakan bahwa sedang dalam mode edit todo item
        setCheckModeEditTodo(true)
    }

    // event check todo done
    let todoDone = (e)=>{
        let raw = {
            is_active:(e.target.checked) ? 0 : 1
        };

        var requestOptions = {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw),
        redirect: 'follow'
        };

        fetch(`https://todo.api.devcode.gethired.id/todo-items/${e.target.dataset.checkboxTodo}`, requestOptions)
        .then(response => response.status)
        .then(result => '')
        .catch(error => console.log('error', error))
        .finally(()=>{
            return (!checkUpdateTodo) ? setCheckUpdateTodo(true) : setCheckUpdateTodo(false)
        })
    }

    
    return (
        <div className="todo-item" data-cy="todo-item">
                <input type="checkbox" onClick={todoDone} className="todo-item-checkbox" data-cy="todo-item-checkbox" defaultChecked={(!activeTodo) ? true : false} data-checkbox-todo={id} />
                <div className="todo-item-priority-indicator" data-icon-todo={priority} data-cy="todo-item-priority-indicator"></div>
                <h3 className={`todo-item-title ${(!activeTodo) && 'todo-done'}`} data-cy="todo-item-title">{title}</h3>
                    <i className="bi bi-pencil todo-item-edit-button" data-cy="todo-item-edit-button" onClick={modeEditTodo} data-edit-id={id} data-edit-title={title} data-edit-priority={priority}></i>
                
                <button className="todo-item-delete-button" data-cy="todo-item-delete-button"  data-delete-id={id} onClick={setDataset} data-delete-title={title}> 
                 <i className="bi bi-trash3" data-cy='modal-delete' data-delete-id={id} data-delete-title={title}></i>
                </button>
        </div>
    )
}


const TodoItem = () =>{
    // use context detail activity
    let {todoItem,dataSortTodo,setDataSortTodo} = useContext(contextDetailActivity);
    useEffect(()=>{
        if(todoItem !== undefined){
            setDataSortTodo(todoItem)
        }
    },[todoItem])

    useEffect(()=>{
        setDataSortTodo(todoItem)
    },[dataSortTodo])

    return (
        <section className="todolist-container">
            {
                (todoItem !== undefined) && dataSortTodo.map(e =>{
                    return <Item key={e.id} id={e.id} title={e.title} priority={e.priority} activeTodo={e.is_active}/>
                })
            }
        </section>
    )
}

export default TodoItem;