import  {useState,useEffect,useContext} from 'react'
import { contextDetailActivity } from '../../../context/ContextDetailActivity'
import validator from 'validator'
import { useParams,useNavigate } from 'react-router-dom'



const TambahListItem = () =>{
    // data url parameter
    let {id}= useParams()

    // data context detail activity
    let {setCheckAddTodo,checkUpdateTodo,setCheckUpdateTodo,checkModeEditTodo,datasetModalDelete} = useContext(contextDetailActivity)

    // state untuk data value input tambah todo
    let [valueInputAddTodo,setValueInputAddTodo] = useState('')

    // state untuk disabled button jika nilai input kosong
    let [checkDisabledButton,setCheckDisabledButton] = useState(true)

    // state untuk menyimpan data priority
    let [dataPriority,setDataPriority] = useState({
        title:'very high',
        datasetPriority:'very-high'
    }) 

    // state untuk cek input priority
    let [checkPriority,setCheckPriority] = useState(false)

    useEffect(()=>{
        if(validator.isEmpty(document.querySelector('.modal-add-name-input').value)) {
        setCheckDisabledButton(true)
        return
    }
    setCheckDisabledButton(false)
    },[])

  useEffect(()=>{
    // check ketika sedang mode edit ada dataset id ,title dan edit priority yg dikirimkan atau tidak
    if(datasetModalDelete !== undefined && datasetModalDelete.editPriority){
        let titlePriority = ''
            if(datasetModalDelete.editPriority === 'very-high'){
                titlePriority = 'very high'
            }
            else if(datasetModalDelete.editPriority === 'very-low'){
                titlePriority = 'very low'
            }
            else if(datasetModalDelete.editPriority === 'normal'){
                titlePriority = 'medium'
            }else{
                titlePriority = datasetModalDelete.editPriority
            }
         setDataPriority({
                title:titlePriority,
                datasetPriority:datasetModalDelete.editPriority
            })
            return
    }
  },[])

    // event get value input add todo
    let getValueInput = (e)=>{
        // CHECK APAKAH VALUE INPUT ADD TODO KOSONG
        if(validator.isEmpty(e.target.value)) {
            setCheckDisabledButton(true)
            return
        }
        setCheckDisabledButton(false)
        setValueInputAddTodo(e.target.value)
    }

    // event dropdown input priorty
    let dropdownPriority = () =>{
        // check apakah sedang memilih input priority
        (!checkPriority) ? setCheckPriority(true) : setCheckPriority(false)
    }

    // EVENT SET VALUE PRIORTY
    let valuePriority = (title,datasetPriority)=>{
        if(title === 'very high' && datasetPriority === 'very-high'){
            setDataPriority({
                title:'very high',
                datasetPriority:'very-high'
            })
            setCheckPriority(false)
            return
        }
        else if(title === 'high' && datasetPriority === 'high'){
            setDataPriority({
                title:'high',
                datasetPriority:'high'
            })
            setCheckPriority(false)
            return
        } else if(title === 'medium' && datasetPriority === 'medium'){
            setDataPriority({
                title:'medium',
                datasetPriority:'normal'
            })
            setCheckPriority(false)
            return
        }else if(title === 'low' && datasetPriority === 'low'){
            setDataPriority({
                title:'low',
                datasetPriority:'low'
            })
            setCheckPriority(false)
            return
        }else{
            setDataPriority({
                title:'very low',
                datasetPriority:'very-low'
            })
            setCheckPriority(false)
            return
        }
    }

    // event add data todo
    const addTodo = ()=>{
        
        let raw = {
            activity_group_id: id,
            title: valueInputAddTodo,
            priority:dataPriority.datasetPriority,
        };

        let requestOptions = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw),
        };

        fetch("https://todo.api.devcode.gethired.id/todo-items", requestOptions)
        .then(response => {
            if(!response.ok){
                return 'error'
            }
           return response.status
        })
        .then(result => {
            setCheckAddTodo(false)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(()=>{
            return (!checkUpdateTodo) ? setCheckUpdateTodo(true) : setCheckUpdateTodo(false)
        })
    }

    // event edit data todo
    let editTodo = ()=>{
        let raw = {
            title: (validator.isEmpty(valueInputAddTodo)) ? datasetModalDelete.editTitle : valueInputAddTodo,
            priority:dataPriority.datasetPriority,
        };

        var requestOptions = {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw),
        redirect: 'follow'
        };

        fetch(`https://todo.api.devcode.gethired.id/todo-items/${datasetModalDelete.editId}`, requestOptions)
        .then(response => response.status)
        .then(result => setCheckAddTodo(false))
        .catch(error => console.log('error', error))
        .finally(()=>{
            return (!checkUpdateTodo) ? setCheckUpdateTodo(true) : setCheckUpdateTodo(false)
        })
    }

    return (
        <section className="container-modal-tambah-item" onClick={()=>{setCheckAddTodo(false)}}>
            <section className="modal-add" data-cy="modal-add" onClick={(event)=>{event.stopPropagation()}}>
                <header className="header-modal-add">
                    <h3 className="modal-add-title" data-cy="modal-add-title">{(checkModeEditTodo) ? 'Edit List Item' :'Tambah List Item'  }</h3>
                    <button className="modal-add-close-button" data-cy="modal-add-close-button">
                        <i className="bi bi-x" onClick={()=>{setCheckAddTodo(false)}}></i>
                    </button>
                </header>
                <section className="body-modal-add">
                    <label htmlFor="modal-add-name-input" className="modal-add-name-title" data-cy="modal-add-name-title">
                        nama list item
                    </label>
                    <input type="text" className="modal-add-name-input" onChange={getValueInput} placeholder="Tambahkan nama list item" defaultValue={(checkModeEditTodo)? datasetModalDelete.editTitle : ''} id="modal-add-name-input" data-cy="modal-add-name-input" />
                    <label className="modal-add-priority-title mt-3" data-cy="modal-add-priority-title">
                        priority
                    </label>
                    <div className="container-modal-add-priority-dropdown">
                            <button className="modal-add-priority-dropdown" data-cy='modal-add-priority-dropdown' onClick={dropdownPriority}>
                                <div className="d-flex devide-title">
                                    <div className="icon-input-priority" data-icon-todo={dataPriority.datasetPriority}>
                                    </div>
                                    {dataPriority.title}
                                </div>
                                <i className={`bi bi-chevron-down  ${(checkPriority && 'icon-up-active')}`}></i>
                            </button>
                            {/* dropdown item priority */}
                            {
                                // chek jika sedang memilih priority
                                (checkPriority)
                                 && 
                                 <div className="divide-primary">
                                <button className="modal-add-priority-item" onClick={valuePriority.bind(this,'very high','very-high')}   data-title-priority='very high'  data-priority='very-high'  data-cy='modal-add-priority-item'>
                                    <div className="icon-input-priority" data-icon-todo="very-high" data-title-priority='very high'  data-priority='very-high'>
                                    </div>
                                    <span data-title-priority='very high'>very high</span>
                                </button>
                                <button className="modal-add-priority-item" data-cy='modal-add-priority-item' onClick={valuePriority.bind(this,'high','high')}>
                                    <div className="icon-input-priority" data-icon-todo="high" >
                                    </div>
                                     <span>high</span>
                                </button>
                                <button className="modal-add-priority-item" data-cy='modal-add-priority-item' onClick={valuePriority.bind(this,'medium','medium')}>
                                    <div className="icon-input-priority" data-icon-todo="normal">
                                    </div>
                                    <span>medium</span>
                                </button>
                                <button className="modal-add-priority-item" data-cy='modal-add-priority-item' onClick={valuePriority.bind(this,'low','low')}>
                                    <div className="icon-input-priority" data-icon-todo="low">
                                    </div>
                                    <span>low</span>
                                </button>
                                <button className="modal-add-priority-item" data-cy='modal-add-priority-item' onClick={valuePriority.bind(this,'very low','very-low')}>
                                    <div className="icon-input-priority" data-icon-todo="very-low">
                                    </div>
                                    <span>very-low</span>
                                </button>
                                </div> 
                            }
                         
                    </div>
                </section>
                <div className="modal-add-save-button">
                    <button type='button' data-cy="modal-add-save-button" onClick={(checkModeEditTodo) ? editTodo : addTodo}  disabled={checkDisabledButton}>Simpan</button>
                </div>
            </section>
        </section>
    )
}

export default TambahListItem;