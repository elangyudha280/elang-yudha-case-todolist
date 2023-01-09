
import { useContext,useEffect,useState } from "react"

import { contextDataActivity } from "../../../context/ContextDashboardActivity"



// component modal delete
const ModalDelete = ()=>{
    let {datasetModalActivity:{deleteActivityId,deleteActivityTitle},updateActivity,setUpdateActivity,setCheckDeleteActivity,setModeDelete} = useContext(contextDataActivity)

    let stopPropagation = (e)=>{
      return  e.stopPropagation()
    }
 
    // event untuk menghapus  activity
    let deleteActivity = (e)=>{
        e.stopPropagation()
        const requestOptions = {
            method: 'DELETE'
          };
        fetch(`https://todo.api.devcode.gethired.id/activity-groups/${deleteActivityId}`,requestOptions).then(Response=>{
            if(!Response.ok){
                throw new Error('DATA ACTIVITY TIDAK BERHASIL DI HAPUS')
            }
            return Response.json()
        })
        .then(result=>{
            setCheckDeleteActivity(true)
        })
        .catch(err => console.log(err))
        .finally(()=>{
            // setCheckLoading(false)
            (!updateActivity) ? setUpdateActivity(true) : setUpdateActivity(false)
        })
    }
  

    return (
        <div className="modal-delete" data-cy="modal-delete" onClick={stopPropagation}>
        <i className="bi bi-exclamation-triangle modal-delete-icon" data-cy="modal-delete-icon"></i>
        <p className="modal-delete-title" data-cy="modal-delete-title">Apakah anda yakin menghapus activity <span className="activity-title">“{deleteActivityTitle}“?</span></p>
        <div className="modal-footer">
            <button className="modal-delete-cancel-button" onClick={()=>{setModeDelete(false)}} data-cy="modal-delete-cancel-button">
                Batal
            </button>
            <button className="modal-delete-confirm-button btn btn-danger" onClick={deleteActivity} data-delete-modal-id={deleteActivityId} data-cy="modal-delete-confirm-button">
                Hapus
            </button>
        </div>
    </div>
    )
}

// component modal succes delete activity
const AlertActivity = ()=>{
    return (
        <div className="modal-information" data-cy="modal-information">
            <i className="bi bi-exclamation-circle text-success" data-cy="modal-information-icon"></i>
            <p data-cy="modal-information-title">Activity berhasil dihapus</p>
        </div>
    )
}

const DeleteActivity = ()=>{

    let {setModeDelete,checkDeleteActivity,setCheckDeleteActivity}= useContext(contextDataActivity)

    return(
        <div className="modal-delete-container-activity" onClick={()=>{
            setModeDelete(false)
            setCheckDeleteActivity(false)
            }}>
            
            {
                (!checkDeleteActivity) ?  <ModalDelete/> : <AlertActivity/> 
            }
        </div>
    )
}


export default DeleteActivity;