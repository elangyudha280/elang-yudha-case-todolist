




const DetailActivity = () =>{
    return (
        <section className="detail-activity container mx-auto">
            {/* header detail activity */}
            <header className="header-detail-activity" data-cy="header-detail-activity">
                <a href="/" className="todo-back-button" data-cy="todo-back-button">
                    <i className="bi bi-chevron-left"></i>
                </a>
                <form action="#">
                    <div className="container-edit-title" data-cy="container-edit-title">
                        {/* <input type="text" className="input-edit-title" data-cy="input-edit-title" defaultValue='new Activity' autoFocus/> */}
                        <h1 className="todo-title" data-cy="todo-title">new Activity</h1>
                        <button className="todo-title-edit-button" data-cy="todo-title-edit-button">
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
        </section>
    )
}

export default DetailActivity;