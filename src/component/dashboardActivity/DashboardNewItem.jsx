
import { useContext,useState,useEffect } from "react"

import { useNavigate } from "react-router-dom";

import { contextDataActivity } from "../../context/ContextDashboardActivity"

// component item activity
const ItemActivity =({id,title,date,eventDatasetModal})=>{
        // parsing date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let dateTostring = new Date(date).toLocaleDateString('id',options);

        let navigateDetail = useNavigate()

        // function to page detail activity
        let goToDetail = ()=>{
            navigateDetail(`detail/${id}`)
        } 
    return(
        <>
            <div className="activity-item" data-cy="activity-item">
                <h3 className="activity-item-title" onClick={goToDetail} data-cy="activity-item-title" data-title-id={id}>{title}</h3>
                <div className="date-activity">
                    <span className="activity-item-date" data-cy="activity-item-date">{dateTostring}</span>
                    <button className="btn activity-item-delete-button"data-cy="activity-item-delete-button">
                      <i className="bi bi-trash3" onClick={eventDatasetModal} data-delete-activity-id={id} data-delete-activity-title={title} ></i>
                    </button>
                </div>
            </div>
        </>
    )
}



// component container dashboard new item
const DashboardNewItem = ()=>{

    let {dataApiActivity,setDatasetModalActivity,setModeDelete} = useContext(contextDataActivity)


    // event untuk send dataset ke modal
    const datasetModal = (e)=>{
        let dataset = {
            deleteActivityId:e.target.dataset.deleteActivityId,
            deleteActivityTitle:e.target.dataset.deleteActivityTitle
        }
        setDatasetModalActivity(dataset)
        setModeDelete(true)
    }

    return (
        <section className="dashboard-new-item" data-cy="dashboard-new-item">
            {
                dataApiActivity.data.map((e) =>{
                    return <ItemActivity key={e.id} id={e.id} title={e.title} date={e.created_at} eventDatasetModal={datasetModal}/>
                })
            }
        </section>
    )
}

export default  DashboardNewItem;