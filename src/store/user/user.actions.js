import { userService } from "../../services/user.service.js";
import { REMOVE_USER, SET_USER, SET_USERS } from "./user.reducer"
import { store } from "../store"

export function loadUsers() {
    return userService.getUsers()
        .then(users => {
            store.dispatch({ type: SET_USERS, users })
        })
        .catch(err => {
            console.log('UserActions: err in loadUsers', err)
        })
}

export function removeUser(userId) {
    return userService.remove(userId)
        .then(() => {
            store.dispatch({ type: REMOVE_USER, userId })
        })
        .catch(err => {
            console.log('UserActions: err in removeUser', err)
        })
}

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({
                type: SET_USER,
                user
            })
            return user
        })
        .catch(err => {
            console.log('Cannot login', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({
                type: SET_USER,
                user
            })
            return user
        })
        .catch(err => {
            console.log('Cannot signup', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({
                type: SET_USER,
                user: null
            })
        })
        .catch(err => {
            console.log('Cannot logout', err)
            throw err
        })
}
