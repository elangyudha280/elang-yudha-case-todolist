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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
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