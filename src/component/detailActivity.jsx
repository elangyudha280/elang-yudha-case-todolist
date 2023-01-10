import { useEffect,useState } from "react";

import { useParams,useNavigate } from "react-router-dom";

import { contextDetailActivity } from "../context/ContextDetailActivity";

// component header detail activity
import HeaderDetailActivity from "./detailActivity/headerDetailActivity";

// component empty state todo
import TodoEmptyState from "./detailActivity/TodoEmptyState";

// component todo item
import TodoItem from "./detailActivity/TodoItem";

// component loading
import Loading from "./loading/loading";


const DetailActivity = () =>{

    // data parameter url
    let {id} = useParams()
    let errorNavigate = useNavigate()

    // state untuk menyimpan nila data detail activity
    let [detailActivity,setDetailActivity] = useState([])

    // state check loading
    let [checkLoading,setCheckLoading] = useState(true)
    

    // data context untuk digunakan di component lain
    let detailContext = {
        detailActivity,
        setDetailActivity
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
            setDetailActivity(result)
        })
        .catch(err =>{
            errorNavigate('/error')
        })
        .finally(()=>{setCheckLoading(false)})
    },[])

    
    
    return (
        <contextDetailActivity.Provider value={detailContext}>
            <section className="detail-activity container mx-auto">
                {
                    (checkLoading) ? <Loading/>
                    :
                    (
                        <>
                        <HeaderDetailActivity/>
                        {/* <TodoEmptyState/> */}
                        <TodoItem/>
                        </>
                    )
                }
            </section>
        </contextDetailActivity.Provider>
    )
}

export default DetailActivity;