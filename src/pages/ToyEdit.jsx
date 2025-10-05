import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { Link, useNavigate, useParams } from "react-router-dom"
import { saveToy } from "../store/toy/toy.actions"
import { showSuccessMsg } from "../services/event-bus.service"


export function ToyEdit(){

    const [toy, setToy] = useState(toyService.createToy())
    const {toyId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(toyId) {
            loadToy()
        }
    }, [])

    function loadToy() {
        toyService.getById(toyId)
        .then((toy) => setToy(toy))
        .catch((err) => console.log('error:', err ))
    }

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = value === '' ? '' : +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        setToy((toy) => ({ ...toy, [field]: value }))
    }

    function onSubmitToy(ev) {
        ev.preventDefault()
        saveToy(toy)
        .then(() => {
            showSuccessMsg('Toy saved successfully!')
            navigate('/toy')
        })
        .catch(err => console.log('err: ', err))
    }


    const { name, price, inStock} = toy
    return(
        <section className="toy-edit">
            <Link to="/toy"><button className="close-btn">X</button></Link>
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSubmitToy}> 
                <label htmlFor="name">Name: </label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name"/>

                <label htmlFor="price">Price: </label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <label htmlFor="inStock">This Toy Is In Stock</label>
                <input onChange={handleChange} checked={inStock} type="checkbox" name="inStock" id="inStock" />

                <section className="btns">
                    <button className="btns">Save</button>
                </section>
            </form>
        </section>

    )
}