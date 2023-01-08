
// import img
import imgEmptyActivity from '../../assets/images/activity-empty-state.png'



const ActivityEmptyState = ()=>{
    return(
        <>
        <button className="activity-empty-state" data-cy="activity-empty-state">
            <img src={imgEmptyActivity} alt="No activity" />
        </button>
        </>
    )
}

export default ActivityEmptyState;