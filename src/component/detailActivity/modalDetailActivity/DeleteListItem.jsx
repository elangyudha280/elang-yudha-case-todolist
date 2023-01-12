import {useEffect,useState,useContext} from 'react';
import { contextDetailActivity } from '../../../context/ContextDetailActivity';
import { useNavigate } from 'react-router-dom';
// component delete todo
const DeleteTodo = ()=>{
    let errorPage= useNavigate()
    let {datasetModalDelete:{deleteId,deleteTitle},setCheckDeleteTodo,setSuccessDelete,checkUpdateTodo,setCheckUpdateTodo} = useContext(contextDetailActivity);

    // event delete data
    const deleteTodo = ()=>{

    let requestOptions = {
    method: 'DELETE',
    }

        fetch(`https://todo.api.devcode.gethired.id/todo-items/${deleteId}`, requestOptions)
    .then(response => response.status)
    .then(result => setSuccessDelete(true))
    .catch(error => errorPage('/errorPage'))
    .finally(()=>{
        return (!checkUpdateTodo) ? setCheckUpdateTodo(true) : setCheckUpdateTodo(false)
    })
    }
    return(
        <div className="modal-delete" data-cy='modal-delete' onClick={(e)=>{e.stopPropagation()}}>
        <i className="bi bi-exclamation-triangle modal-delete-icon" data-cy="modal-delete-icon"></i>
        <p className="modal-delete-title" data-cy="modal-delete-title">Apakah anda yakin menghapus activity <span className="activity-title">“{deleteTitle}“?</span></p>
        <div className="modal-footer" data-cy='modal-delete-confirm-button'>
            <button className="modal-delete-cancel-button" onClick={()=>{setCheckDeleteTodo(false)}} data-cy="modal-delete-cancel-button">
                Batal
            </button>
            <button className="modal-delete-confirm-button btn btn-danger"   data-cy='modal-delete-confirm-button' onClick={deleteTodo} data-delete-id={deleteId}>
                Hapus
            </button>
            </div>
        </div>
    )
}

const AlertActivity = ()=>{
    return (
        <div className="modal-information" data-cy='modal-information'>
            <i className="bi bi-exclamation-circle text-success"></i>
            <p data-cy="modal-information-title">Activity berhasil dihapus</p>
        </div>
    )
}



const DeleteListItem = ()=>{
    // context check delete todo
    let {setCheckDeleteTodo,successDelete,setSuccessDelete} = useContext(contextDetailActivity) 

    return (
        
        <div className="modal-delete-container-activity" data-cy='modal-delete' onClick={()=>{
            // check untuk menghilangkan modal delete
            setCheckDeleteTodo(false)
            // check untuk menghilangkan modal information success delete todo item
            setSuccessDelete(false)
            }}>
           {
            // check apakah data todo item berhasil di hapus
            (successDelete) ? <AlertActivity/> : <DeleteTodo/> 
           }
        </div>
    )
}

export default DeleteListItem;