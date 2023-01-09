
import { useEffect,useState,useContext } from "react";
import { useParams } from "react-router-dom";
import { contextDetailActivity } from "../../context/ContextDetailActivity";


const HeaderDetailActivity = ()=>{
    let {id} = useParams()
    // data context dari component detailActivity
    let {detailActivity} = useContext(contextDetailActivity);

    // state data detail title
    let [detailTitle,setDetailTitle] = useState('')

    // state check mode edit title
    let [modeEditTitle,setModeEditTitle] = useState(false)

    // state untuk menyimpan data input title
    let [inputTitle,setInputTitle]= useState('')

    // function untuk det data detail title
    useEffect(()=>{
        setDetailTitle(detailActivity.title)
        setInputTitle(detailActivity.title)
    },[detailActivity])

    // event mode edit
    let modeEdit = (e)=>{
        (!modeEditTitle) ? setModeEditTitle(true) : setModeEditTitle(false)
        e.preventDefault()
        if(modeEditTitle){
            var raw = {
                title:inputTitle
            }
            var requestOptions = {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raw),
            redirect: 'follow'
            };

            fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => '')
            .catch(error => '');
        }
    }



    // event edit input title
    const editInputTitle = (e)=>{
        setInputTitle(e.target.value)
        setDetailTitle(e.target.value)
    }

    return (
        <header className="header-detail-activity" data-cy="header-detail-activity">
            <a href="/" className="todo-back-button" data-cy="todo-back-button">
                <i className="bi bi-chevron-left"></i>
            </a>
            <form action="#" onSubmit={modeEdit}>
                <div className="container-edit-title" data-cy="container-edit-title">
                    {
                        (modeEditTitle) 
                        ?
                        <input type="text" className="input-edit-title" onInput={editInputTitle} data-cy="input-edit-title" defaultValue={inputTitle} autoFocus/>
                        :
                        <h1 className="todo-title" data-cy="todo-title">{detailTitle}</h1> 
                    }
                    <button className="todo-title-edit-button" type="submit" data-cy="todo-title-edit-button">
                        <i className="bi bi-pencil"></i>
                    </button>
                </div>
            </form>
            <div className="button-action">
                <button className="todo-sort-button" data-cy="todo-sort-button">
                <i className="bi bi-funnel"></i>
                </button>
                <button className="todo-add-button" data-cy="todo-add-button">
                        <i className="bi bi-plus-lg"></i>
                        Tambah
                </button>
            </div>
        </header> 
    )
}

export default HeaderDetailActivity;