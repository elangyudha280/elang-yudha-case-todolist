import  {useState,useEffect,useContext} from 'react'
import { contextDetailActivity } from '../../../context/ContextDetailActivity'




const TambahListItem = () =>{

    // data context detail activity
    let {setCheckAddTodo} = useContext(contextDetailActivity)

    // state untuk cek input priority
    let [checkPriority,setCheckPriority] = useState(false)

    // event dropdown input priorty
    let dropdownPriority = () =>{
        // check apakah sedang memilih input priority
        (!checkPriority) ? setCheckPriority(true) : setCheckPriority(false)
    }
    return (
        <section className="container-modal-tambah-item" onClick={()=>{setCheckAddTodo(false)}}>
            <section className="modal-add" data-cy="modal-add" onClick={(event)=>{event.stopPropagation()}}>
                <header className="header-modal-add">
                    <h3 className="modal-add-title" data-cy="modal-add-title">Tambah List Item</h3>
                    <button className="modal-add-close-button" onClick={()=>{setCheckAddTodo(false)}} data-cy="modal-add-close-button">
                        <i className="bi bi-x"></i>
                    </button>
                </header>
                <section className="body-modal-add">
                    <label htmlFor="modal-add-name-input" className="modal-add-name-title" data-cy="modal-add-name-title">
                        nama list item
                    </label>
                    <input type="text" className="modal-add-name-input"  placeholder="Tambahkan nama list item" id="modal-add-name-input" data-cy="modal-add-name-input" />
                    <label className="modal-add-priority-title mt-3" data-cy="modal-add-priority-title">
                        priority
                    </label>
                    <div className="container-modal-add-priority-dropdown">
                            <button className="modal-add-priority-dropdown" data-cy="modal-add-priority-dropdown" onClick={dropdownPriority}>
                                <div className="d-flex devide-title">
                                    <div className="icon-input-priority" data-icon-todo="very-high">
                                        
                                    </div>
                                    very high
                                </div>
                                <i className={`bi bi-chevron-up fw-bold ${(checkPriority && 'icon-up-active')}`}></i>
                            </button>
                            {/* dropdown item priority */}
                            {
                                // cek jika sedang milih priority
                                (checkPriority)
                                 && 
                                 <div className="divide-primary">
                                <button className="modal-add-priority-item" data-cy="modal-add-priority-item">
                                    <div className="icon-input-priority" data-icon-todo="very-high">
                                    </div>
                                    <span>very high</span>
                                    <i className="bi bi-check-lg"></i>
                                </button>
                                   <button className="modal-add-priority-item" data-cy="modal-add-priority-item">
                                    <div className="icon-input-priority" data-icon-todo="high">
                                    </div>
                                     <span>high</span>
                                    <i className="bi bi-check-lg"></i>
                                </button>
                                <button className="modal-add-priority-item" data-cy="modal-add-priority-item">
                                    <div className="icon-input-priority" data-icon-todo="normal">
                                    </div>
                                    <span>medium</span>
                                    <i className="bi bi-check-lg"></i>
                                </button>
                                <button className="modal-add-priority-item" data-cy="modal-add-priority-item">
                                    <div className="icon-input-priority" data-icon-todo="low">
                                    </div>
                                    <span>low</span>
                                    <i className="bi bi-check-lg"></i>
                                </button>
                                <button className="modal-add-priority-item" data-cy="modal-add-priority-item">
                                    <div className="icon-input-priority" data-icon-todo="very-low">
                                    </div>
                                    <span>very-low</span>
                                    <i className="bi bi-check-lg"></i>
                                </button>
                                </div> 
                            }
                         
                    </div>
                </section>
                <div className="modal-add-save-button">
                    <button data-cy="modal-add-save-button" >Simpan</button>
                </div>
            </section>
        </section>
    )
}

export default TambahListItem;