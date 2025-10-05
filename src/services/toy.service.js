import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    createToy,
    getDefaultFilter,
    getFilterFromSearchParams
}

const STORAGE_KEY = 'toys'
_createToys()


function query(filterBy) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                toys = toys.filter(toy =>
                    toy.name.toLowerCase().includes(name.toLowerCase()) 
                )
            }
            if(filterBy.inStock){
                if(filterBy.inStock === 'inStock') toys = toys.filter(toy => toy.inStock)
                else if (filterBy.id ==='notInStock') toys =toys.filter(toy => !toy.inStock)
            }
            return toys
        })
        .catch(error => {
            console.log('error:', error)
            throw error
        })
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(toyToSave) {
    if (toyToSave._id) {
        return storageService.put(STORAGE_KEY, toyToSave)
    } else {
        toyToSave.isOn = false
        return storageService.post(STORAGE_KEY, toyToSave)
    }
}


function createToy(name = '', price = 100, inStock = false) {
    return {
        name,
        price,
        inStock
    }
}

function getDefaultFilter() {
    return {
        name: '',
        inStock: true
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            { _id: 't101', name: 'Talking Doll', price: 123, labels: ['Doll', 'Battery Powered', 'Baby'], createdAt: Date.now(), inStock: true },
            { _id: 't102', name: 'Lego City Set', price: 299, labels: ['Lego', 'Blocks', 'Building'], createdAt: Date.now(), inStock: true },
            { _id: 't103', name: 'Remote Car', price: 180, labels: ['Car', 'Remote Control', 'Battery Powered'], createdAt: Date.now(), inStock: false },
            { _id: 't104', name: 'Teddy Bear', price: 90, labels: ['Plush', 'Bear', 'Soft'], createdAt: Date.now(), inStock: true },
            { _id: 't105', name: 'Puzzle 1000 pieces', price: 75, labels: ['Puzzle', 'Board Game', 'Logic'], createdAt: Date.now(), inStock: true },
            { _id: 't106', name: 'Drone X200', price: 550, labels: ['Drone', 'Flying', 'Battery Powered'], createdAt: Date.now(), inStock: false },
            { _id: 't107', name: 'Soccer Ball', price: 65, labels: ['Outdoor', 'Sports', 'Ball'], createdAt: Date.now(), inStock: true },
            { _id: 't108', name: 'Play-Doh Set', price: 45, labels: ['Craft', 'Creative', 'Kids'], createdAt: Date.now(), inStock: true },
            { _id: 't109', name: 'Train Set', price: 200, labels: ['Train', 'Tracks', 'Battery Powered'], createdAt: Date.now(), inStock: true },
            { _id: 't110', name: 'Barbie Dream House', price: 400, labels: ['Doll', 'House', 'Playset'], createdAt: Date.now(), inStock: true },
            { _id: 't111', name: 'Rubik’s Cube', price: 30, labels: ['Logic', 'Puzzle', 'Brain Teaser'], createdAt: Date.now(), inStock: true },
            { _id: 't112', name: 'Water Gun', price: 55, labels: ['Outdoor', 'Summer', 'Water'], createdAt: Date.now(), inStock: false },
            { _id: 't113', name: 'Nerf Blaster', price: 120, labels: ['Gun', 'Foam', 'Action'], createdAt: Date.now(), inStock: true },
            { _id: 't114', name: 'Play Kitchen', price: 350, labels: ['Role Play', 'Cooking', 'Kids'], createdAt: Date.now(), inStock: true },
            { _id: 't115', name: 'Chess Set', price: 95, labels: ['Board Game', 'Logic', 'Classic'], createdAt: Date.now(), inStock: true },
            { _id: 't116', name: 'Action Figure Superman', price: 80, labels: ['Action Figure', 'Superhero', 'Collectible'], createdAt: Date.now(), inStock: false },
            { _id: 't117', name: 'Electric Train', price: 260, labels: ['Train', 'Tracks', 'Battery Powered'], createdAt: Date.now(), inStock: true },
            { _id: 't118', name: 'Skateboard', price: 150, labels: ['Outdoor', 'Sports', 'Kids'], createdAt: Date.now(), inStock: true },
            { _id: 't119', name: 'RC Helicopter', price: 320, labels: ['Flying', 'Remote Control', 'Battery Powered'], createdAt: Date.now(), inStock: false },
            { _id: 't120', name: 'Monopoly Classic', price: 110, labels: ['Board Game', 'Family', 'Classic'], createdAt: Date.now(), inStock: true }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}
