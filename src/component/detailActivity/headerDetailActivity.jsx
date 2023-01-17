
import { useEffect,useState,useContext } from "react";
import { useParams,Link } from "react-router-dom";
import { contextDetailActivity } from "../../context/ContextDetailActivity";


// component sort element
const SortElement = ({title,classIcon,activeSort,setDropdownSorting})=>{

    // use context detail activity
    let {todoItem,setDataSortTodo,checkUpdateTodo,setCheckUpdateTodo,checkSortTodo,setCheckSortTodo} = useContext(contextDetailActivity);

    // event sorting data
    let eventSortingData =()=>{
        if(title === 'terbaru'){
            let sorting = todoItem.sort((a,b)=>{
                return b.id - a.id
            }) 
            setDataSortTodo(sorting)
            setDropdownSorting(false)
            
            return (!checkSortTodo) ? setCheckSortTodo(true) : setCheckSortTodo(false)
        }else if(title === 'terlama'){
            let sorting = todoItem.sort((a,b)=>{
                return a.id - b.id
            }) 
            setDataSortTodo(sorting)
            setDropdownSorting(false)
            
            return (!checkSortTodo) ? setCheckSortTodo(true) : setCheckSortTodo(false)
        }else if(title === 'A-Z'){
            let sorting = todoItem.sort((a,b)=>{
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase(); 
              if (titleA < titleB) {
                  return -1;
              }
              return
          }) 
          setDataSortTodo(sorting)
          setDropdownSorting(false)

          return (!checkSortTodo) ? setCheckSortTodo(true) : setCheckSortTodo(false)
        }else if(title === 'Z-A'){
              let sorting = todoItem.sort((a,b)=>{
                      const titleA = a.title.toLowerCase(); 
                     const titleB = b.title.toLowerCase(); 
                    if (titleA > titleB) {
                        return -1;
                    }
                    return
                }) 
                setDataSortTodo(sorting)
                setDropdownSorting(false)

                return (!checkSortTodo) ? setCheckSortTodo(true) : setCheckSortTodo(false)
        }else{
            let sorting = todoItem.sort((a,b)=>{
                return   b.is_active - a.is_active
            }) 
            setDataSortTodo(sorting)
            setDropdownSorting(false)

            return (!checkSortTodo) ? setCheckSortTodo(true) : setCheckSortTodo(false)
        }
    }
    return(
        <>
            <button className="sort-selection" data-cy="sort-selection" onClick={eventSortingData}>
                        <i className={`${classIcon} icon-sort`}></i>
                        <span className="title-sort">{title}</span>
                        <i className="bi bi-check-lg icon-check-sort"></i>
            </button>
        </>
    )
}


const HeaderDetailActivity = ()=>{
    let {id} = useParams()
    // data context dari component detailActivity
    let {detailActivity,setCheckAddTodo,setCheckModeEditTodo} = useContext(contextDetailActivity);

    // state data detail title
    let [detailTitle,setDetailTitle] = useState('')

    // state check mode edit title
    let [modeEditTitle,setModeEditTitle] = useState(false)

    // state untuk menyimpan data input title
    let [inputTitle,setInputTitle]= useState('')

    // state untuk mengecheck dropdown sorting
    let [dropdownSorting,setDropdownSorting] = useState(false)

    // state untk menyimpan data sortin item
    let [dataSortingItem,setDataSortingItem]= useState([
        {
            titleSort:'terbaru',
            classIcon:'bi bi-sort-up',
            activeSort:true
        },
        {
            titleSort:'terlama',
            classIcon:'bi bi-sort-down',
            activeSort:false
        },
        {
            titleSort:'A-Z',
            classIcon:'bi bi-sort-alpha-up',
            activeSort:false
        },
        {
            titleSort:'Z-A',
            classIcon:'bi-sort-alpha-up-alt',
            activeSort:false
        },
        {
            titleSort:'belum-selesai',
            classIcon:'bi bi-filter',
            activeSort:false
        }
    ])

    // function untuk det data detail title
    useEffect(()=>{
        setDetailTitle(detailActivity.title)
        setInputTitle(detailActivity.title)
    },[detailActivity])

    // event mode edit
    let modeEdit = (e)=>{
        e.preventDefault()
        if(e.target.classList.contains('input-edit-title') || e.target.classList.contains('todo-title') || e.target.classList.contains('bi-pencil') ){
        (!modeEditTitle) ? setModeEditTitle(true) : setModeEditTitle(false)
        }
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
            .then(response => response.status)
            .then(result => '')
            .catch(error => '')
            .finally(()=>{setModeEditTitle(false)})
        }
    }

    // event toggle dropdown sorting
    let toggleDropdownSorting= ()=>{
        (!dropdownSorting) ? setDropdownSorting(true) : setDropdownSorting(false)
    }

    // event edit input title
    const editInputTitle = (e)=>{
        setInputTitle(e.target.value)
        setDetailTitle(e.target.value)
    }


    return (
        <header className="header-detail-activity" data-cy="header-detail-activity" onClick={modeEdit}>
            <Link to="/" className="todo-back-button" data-cy="todo-back-button">
                <i className="bi bi-chevron-left"></i>
            </Link>
            <form action="#">
                <div className="container-edit-title" data-cy="container-edit-title">
                    {
                        (modeEditTitle) 
                        ?
                        <input type="text" className="input-edit-title" onInput={editInputTitle} data-cy="input-edit-title" defaultValue={inputTitle} autoFocus/>
                        :
                        <h1 className="todo-title" data-cy='todo-title'>{detailTitle}</h1> 
                    }
                    <button className="todo-title-edit-button" type="submit" data-cy="todo-title-edit-button">
                        <i className="bi bi-pencil"></i>
                    </button>
                </div>
            </form>
            <div className="button-action">
                <button className="todo-sort-button" data-cy="todo-sort-button"
                 onClick={toggleDropdownSorting}
                >
                <i className="bi bi-funnel"></i>
                </button>
                <button className="todo-add-button" onClick={()=>{
                    setCheckAddTodo(true)
                    setCheckModeEditTodo(false)
                    }} data-cy='todo-add-button'>
                        <i className="bi bi-plus-lg"></i>
                        Tambah
                </button>
                
                {
                    // cek untuk menampilkan dropdown sorting
                    (dropdownSorting) &&
                    <div className="devide-sorting">
                        {
                            dataSortingItem.map(e =>{
                                return <SortElement key={e.titleSort} title={e.titleSort} classIcon={e.classIcon} activeSort={e.activeSort} setDropdownSorting={setDropdownSorting}/>
                            })
                        }
                    </div>
                }
            </div>
        </header> 
    )
}

export default HeaderDetailActivity;