
// component modal delete
const ModalDelete = ()=>{
    return (
        <div className="modal-delete" data-cy="modal-delete">
        <i className="bi bi-exclamation-triangle modal-delete-icon" data-cy="modal-delete-icon"></i>
        <p className="modal-delete-title" data-cy="modal-delete-title">Apakah anda yakin menghapus activity <span className="activity-title">“new activity“?</span></p>
        <div className="modal-footer">
            <button className="modal-delete-cancel-button" data-cy="modal-delete-cancel-button">
                Batal
            </button>
            <button className="modal-delete-confirm-button btn btn-danger" data-cy="modal-delete-confirm-button">
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
    return(
        <div className="modal-delete-container-activity">
            <AlertActivity/>
           {/* <ModalDelete/> */}
        </div>
    )
}


export default DeleteActivity;