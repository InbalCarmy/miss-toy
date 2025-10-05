import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { ADD_TOY, EDIT_TOY, REMOVE_TOY, SET_FILTER, SET_TOYS, UNDO_CHANGES } from "./toy.reducer";
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

export function removeToy(toyId){
    return toyService.remove(toyId)
    .then(() => {
        store.dispatch({type: REMOVE_TOY, toyId})
    })
    .catch(err => {
        console.log('Having issues removing toy: ', err);
        throw err  
    })
}

export function removeToyOptimistic(toyId){
    store.dispatch({type: REMOVE_TOY, toyId})
    return toyService.remove(toyId)
    .catch(err => {
        console.log('Having issues removing toy: ', err)
        store.dispatch({type: UNDO_CHANGES})
        throw err    
    })
}

export function saveToy(toyToSave) {
    const type = toyToSave._id ? EDIT_TOY : ADD_TOY
    return toyService.save(toyToSave)
    .then(toy => store.dispatch({type, toy}))
    .catch(err => {
        console.log('Having issues saving toy:', err);
        throw err
        
    })
}

export function setFilterBy(filterBy) {
    store.dispatch({type: SET_FILTER, filterBy })

}