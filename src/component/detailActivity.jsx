import { useEffect,useState } from "react";

import { useParams,useNavigate } from "react-router-dom";

import { contextDetailActivity } from "../context/ContextDetailActivity";

// component header detail activity
import HeaderDetailActivity from "./detailActivity/headerDetailActivity";

// modal delete list item || todo
import DeleteListItem from "./detailActivity/modalDetailActivity/DeleteListItem";

// modal add list item || todo
import TambahListItem from "./detailActivity/modalDetailActivity/TambahListItem";

// component empty state todo
import TodoEmptyState from "./detailActivity/TodoEmptyState";

// component todo item
import TodoItem from "./detailActivity/TodoItem";

// component loading
import Loading from "./loading/loading";


const DetailActivity = () =>{

    // data parameter url
    let {id} = useParams()
    // navigate untuk mengarahkan ke page error ketika data gagal di dapatkan
    let errorNavigate = useNavigate()

    // state untuk menyimpan data detail activity
    let [detailActivity,setDetailActivity] = useState([])

    // state check loading
    let [checkLoading,setCheckLoading] = useState(true)

    // state untuk menyimpan data todolist item
    let [todoItem,setTodoItem] = useState([])   

    // state untuk mengecek apakah terjadi perbuahan pada data todo
    let [checkUpdateTodo,setCheckUpdateTodo] =useState(false)

    // state untuk mengecek apakah sedang dalam mode tambah todo
    let [checkAddTodo,setCheckAddTodo] = useState(false)
    
    // state untuk mengecek apakah sedang dalam mode delete todo
    let [checkDeleteTodo,setCheckDeleteTodo] = useState(false)

    // state untuk data dataset id dan title modal 
    let [datasetModalDelete,setDatasetModalDelete]= useState()

    // data state untuk mengecek apakah success menghapus data
    let [successDelete,setSuccessDelete] = useState(false)

    // state untuk mengecek apakah sedang dalam mode edit todo
    let [checkModeEditTodo,setCheckModeEditTodo] = useState(false)

    // data context untuk digunakan di component lain
    let detailContext = {
        detailActivity,
        setDetailActivity,
        todoItem,
        setTodoItem,
        checkAddTodo,
        setCheckAddTodo,
        checkUpdateTodo,
        setCheckUpdateTodo,
        checkDeleteTodo,
        setCheckDeleteTodo,
        datasetModalDelete,
        setDatasetModalDelete,
        successDelete,
        setSuccessDelete,
        checkModeEditTodo,
        setCheckModeEditTodo
    }

    // fungsi untuk get data detail activity
    useEffect(()=>{
        document.title = 'To Do List - Detail'
        fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`).then(Response=>{
            if(!Response.ok){
                throw new Error('DATA ACTIVITY TIDAK BERHASIL DI DAPATKAN')
            }
            return Response.json()
        })
        .then(result=>{
            // update data detail activity
            setDetailActivity(result)
        })
        .catch(err =>{
            // arahkan ke page error
            errorNavigate('/error')
        })
        .finally(()=>{setCheckLoading(false)})
    },[])

    // function untuk get data todo item
    // 
    useEffect(()=>{
        fetch(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`).then(Response=>{
            if(!Response.ok){
                throw new Error('TODO ITEM TIDAK BERHASIL DI DAPATKAN')
            }
            return Response.json()
        })
        .then(result=>{
            // update data todo item
            setTodoItem(result.data)
        })
        .catch(err =>{
            // arahkan ke page error
            errorNavigate('/error')
        })
        .finally(()=>{''})
    },[checkUpdateTodo])

    
    
    return (
        <contextDetailActivity.Provider value={detailContext}>
            <section className="detail-activity container mx-auto">
                {
                    // check apakah sedang loading
                    (checkLoading) ? <Loading/>
                    :
                    (
                        <>
                        <HeaderDetailActivity/>
                            {
                                // cek apakah todolist nya ada atau kosong
                                (todoItem.length === 0 || todoItem === undefined) ? <TodoEmptyState/> : <TodoItem/>
                            }
                        </>
                    )
                }
            </section>
            {/* modal delete todo item */}
            {
                // check apakah sedang dalam mode delete todo item
                (checkDeleteTodo) && <DeleteListItem/> 
            }
            {/* modal tambah todo item */}
            {
                // check apakah sedang dalam moda tambah todo item
                (checkAddTodo) && <TambahListItem/>
            }
        </contextDetailActivity.Provider>
    )
}

export default DetailActivity;