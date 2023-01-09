
import { useContext,useState,useEffect } from "react"

import { contextDataActivity } from "../../context/ContextDashboardActivity"

// component item activity
const ItemActivity =({id,title,date})=>{
        // parsing date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let dateTostring = new Date(date).toLocaleDateString('id',options);
    return(
        <>
            <div className="activity-item" data-cy="activity-item">
                <h3 className="activity-item-title" data-cy="activity-item-title" dat-title-id={id}>{title}</h3>
                <div className="date-activity">
                    <span className="activity-item-date" data-cy="activity-item-date">{dateTostring}</span>
                    <button className="btn activity-item-delete-button" data-delete-activity-id={id} data-cy="activity-item-delete-button">
                      <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        </>
    )
}



// component container dashboard new item
const DashboardNewItem = ()=>{

    let {dataApiActivity} = useContext(contextDataActivity)

    useEffect(()=>{
        console.log(dataApiActivity)
    },[])

    return (
        <section className="dashboard-new-item" data-cy="dashboard-new-item">
            {
                dataApiActivity.data.map((e) =>{
                    return <ItemActivity key={e.id} id={e.id} title={e.title} date={e.created_at}/>
                })
            }
        </section>
    )
}

export default  DashboardNewItem;