import { useState,useEffect,useContext } from "react";

import { contextDataActivity } from "../context/ContextDashboardActivity";

// component dashboard new activity ||  item 
import DashboardNewItem from "./dashboardActivity/DashboardNewItem"; 

// import activity empty state
import ActivityEmptyState from "./dashboardActivity/ActivityEmptyState";
// component animate loading
import Loading from "./loading/loading";
// modal delete activity
import DeleteActivity from "./dashboardActivity/modalActivity/DeleteActivity";


const DashboardActivity = ()=>{

    // STATE UNTUK MENYIMPAN DATA API ACTIVITY
    let [dataApiActivity,setDataApiActivity] = useState()

    // state  untuk update || check apakah activitynya ada perubahan
    let [updateActivity,setUpdateActivity] = useState(false)

    // state untuk apakah sedang login
    let [checkLoading,setCheckLoading] = useState(true)

    // state untuk check apakah sedang dalam mode delete
    let [modeDelete,setModeDelete] = useState(false)

    // state untuk menyimpan data check apakah berhasil menghapus data activity
    let[checkDeleteActivity,setCheckDeleteActivity] = useState(false);

    // state untuk menyimpan dataset id dan title dari button delete activity
    let [datasetModalActivity,setDatasetModalActivity] = useState()

    // data state untuk di jadikan context supaya bisa digunakan oleh component lain
    let contextActivity = {
        dataApiActivity,
        setDataApiActivity,
        updateActivity,
        setUpdateActivity,
        modeDelete,
        setModeDelete,
        datasetModalActivity,
        setDatasetModalActivity,
        checkDeleteActivity,
        setCheckDeleteActivity
    }

    // fungsi untuk get data api activity
    useEffect(()=>{
        document.title = 'Todo List App - Dashboard'
        fetch('https://todo.api.devcode.gethired.id/activity-groups?email=elangyudharakasiwi@gmail.com').then(Response=>{
            if(!Response.ok){
                throw new Error('DATA ACTIVITY TIDAK BERHASIL DI DAPATKAN')
            }
            return Response.json()
        })
        .then(result=>{
            setDataApiActivity(result)
        })
        .catch(err => console.log(err))
        .finally(()=>{setCheckLoading(false)})
    },[updateActivity])


    // event add data activity
    const addActivity = ()=>{
     // set animate loading
     setCheckLoading(true)
     // set data raw for activity
     let raw = {
             title: 'new Activity',
             email:'elangyudharakasiwi@gmail.com'
         };

     // set request option fetch
     let requestOptions = {
     method: 'POST',
     headers:{
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(raw),
     redirect: 'follow'
     };

     // fetch untuk post data
     fetch("https://todo.api.devcode.gethired.id/activity-groups?email=elangyudharakasiwi@gmail.com",requestOptions)
     .then(response => response.status)
     .then(result => {
         return ''
     })
     .catch(error => console.log('error', error))
     .finally(()=>{  
         // set update
         (!updateActivity) ? setUpdateActivity(true) : setUpdateActivity(false) 
         setCheckLoading(false) 
     })

    }

    return (
        <contextDataActivity.Provider value={contextActivity}> 
            <section className="dashboard-activity container mx-auto">
                {/* dashboard activity header */}
                <header className="header-activity" data-cy='header-title'>
                    <h1 className="activity-title" data-cy="activity-title">TO DO LIST APP Activity</h1>
                    <button className="btn btn-activity-add-button" onClick={addActivity} data-cy="activity-add-button">
                    <i className="bi bi-plus-lg"></i>
                        Tambah
                        </button>
                </header>

                {
                    //check apakah sedang loading
                    (checkLoading) ? <Loading/>
                    :
                   // check apakah data activity nya tidak ada atau kosong
                   (dataApiActivity.data.length === 0 || dataApiActivity === undefined) 
                   ?
                   <ActivityEmptyState eventAddActivity={addActivity}/>
                   :
                   <DashboardNewItem/> 
                }
             
            </section>

            {/* component modal delete activity */}
            {
                (modeDelete) && <DeleteActivity/>
            }
        </contextDataActivity.Provider>
    )
}

export default DashboardActivity;