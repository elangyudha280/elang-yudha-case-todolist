
// import img
import imgEmptyActivity from '../../assets/images/activity-empty-state.png'


// compononent empty activity
const ActivityEmptyState = ({eventAddActivity})=>{
    return(
        <>
        <button className="activity-empty-state" onClick={eventAddActivity} data-cy="activity-empty-state">
            <img src={imgEmptyActivity} alt="No activity" />
        </button>
        </>
    )
}

export default ActivityEmptyState;