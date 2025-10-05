import { useEffect } from "react";
import { loadToys, setFilterBy, removeToy } from "../store/toy/toy.actions";
import { useSearchParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toyService } from "../services/toy.service";
import { getExistingProperties } from "../services/util.service";
import { ToyFilter } from "../cmps/ToyFilter";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { ToyList } from "../cmps/ToyList";



export function ToyIndex() {
    const [searchParams, setSearchParams] =useSearchParams()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        setFilterBy(toyService.getFilterFromSearchParams(searchParams))

    }, [])

    useEffect(() => {
        loadToys()
        setSearchParams(getExistingProperties(filterBy))
    },[filterBy])

        
    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId){
        removeToy(toyId)
        .then(() => showSuccessMsg('Toy Was Removed!'))
        .catch(()=> showErrorMsg(`Having issues removing Toy (${toyId})`))
    }

    const {name, inStock} = filterBy
    return(
        <section className="toy-index">
            <h1>Welcome! this is our toys:</h1>
            <main>
                <ToyFilter onSetFilterBy={onSetFilterBy} filterBy={{name, inStock}}/>
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                <Outlet />
            </main>

        </section>
    )

}