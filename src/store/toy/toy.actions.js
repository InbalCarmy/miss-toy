import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { SET_FILTER, SET_TOYS } from "./toy.reducer";
import { showErrorMsg } from "../../services/event-bus.service";




export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Having issues with loading toys:', err)
            showErrorMsg('Having issues with loading toys:')
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({type: SET_FILTER, filterBy })

}