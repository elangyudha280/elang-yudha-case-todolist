

// component dashboard new activity ||  item 
import DashboardNewItem from "./dashboardActivity/DashboardNewItem"; 

// import activity empty state
import ActivityEmptyState from "./dashboardActivity/ActivityEmptyState";


const DashboardActivity = ()=>{
    return (
        <section className="dashboard-activity container mx-auto">
            {/* dashboard activity header */}
            <header className="header-activity">
                <h1 className="activity-title" data-cy="activity-title">Activity</h1>
                <button className="btn btn-activity-add-button" data-cy="activity-add-button">
                <i className="bi bi-plus-lg"></i>
                    Tambah
                    </button>
            </header>

            {/* activity item */}
            {/* <DashboardNewItem/> */}

            {/* empty activity */}
            <ActivityEmptyState/>
        </section>
    )
}

export default DashboardActivity;